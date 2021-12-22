import {randomUUID} from "crypto";
import {UserAccountDeleted} from "./domain_events/UserAccountDeleted.event";
import {UserConfirmed} from "./domain_events/UserConfirmed.event";
import {UserDataUpdated} from "./domain_events/UserDataUpdated.event";
import {UserReactivated} from "./domain_events/UserReactivated.event";
import {UserRegistered} from "./domain_events/UserRegistered.event";
import {UserSuspended} from "./domain_events/UserSuspended.event";
import {CV} from "./entities/CV.entity";
import {CVStatus} from "./enums/CVStatus.enum";
import {UserStatus} from "./enums/UserStatus.enum";
import CVAcademicFormation from "./value_objects/CVAcademicFormation.value";
import CVCourses from "./value_objects/CVCourses.value";
import CVID from "./value_objects/CVID.value";
import CVSkills from "./value_objects/CVSkills.value";
import {UserBirthday} from "./value_objects/UserBirthday.value";
import {UserEmail} from "./value_objects/UserEmail.value";
import {UserFirstName} from "./value_objects/UserFirstName.value";
import {UserID} from "./value_objects/UserID.value";
import {UserLastName} from "./value_objects/UserLastName.value";
import {UserPassword} from "./value_objects/UserPassword.value";

type UserEvents = UserRegistered 
	| UserConfirmed 
	| UserSuspended
	| UserReactivated
	| UserDataUpdated 
	| UserAccountDeleted

type CVType<S> = S extends UserStatus.Unconfirmed ? CV<CVStatus.Unconfirmed> | CV<CVStatus.Rejected> : 
			S extends UserStatus.Active?  CV<CVStatus.Aproved> : CV<CVStatus>

export class User<S extends UserStatus>{
	private ID: UserID
	public status: S
	public cv?: CVType<S> 
	private eventRecorder: UserEvents[] = []
	
	private constructor(
		public firstname: UserFirstName,
		public lastname: UserLastName,
		public birthday: UserBirthday,
		public email: UserEmail,
		public password: UserPassword,
		status: S,
		id?: UserID,
	){
		this.status = status
		this.ID = id || new UserID(randomUUID())
	}

	getID(): UserID { return this.ID }
	getEvents(): UserEvents[] { return this.eventRecorder }

	static register(
		firstname: UserFirstName,
		lastname: UserLastName,
		birthday: UserBirthday,
		email: UserEmail,
		password: UserPassword,
	): User<UserStatus.Unconfirmed> {
		const user = new User(firstname,lastname,birthday,email,password,UserStatus.Unconfirmed)
		user.eventRecorder.push(new UserRegistered(
			user.ID,
			user.firstname,
			user.lastname,
			user.birthday,
			user.email,
			user.password,
			user.status
		))
		return user
	}

	confirm(this: User<UserStatus.Unconfirmed>): User<UserStatus.Active>{
		const user = new User(
			this.firstname,
			this.lastname,
			this.birthday,
			this.email,
			this.password,
			UserStatus.Active,
			this.ID
		)
		user.eventRecorder = this.eventRecorder.slice(0)
		user.eventRecorder.push(new UserConfirmed(
			user.ID,
			user.status
		))
		return user
	}

	suspend(this: User<UserStatus.Active>): User<UserStatus.Supended>{
		const user = new User(
			this.firstname,
			this.lastname,
			this.birthday,
			this.email,
			this.password,
			UserStatus.Supended,
			this.ID
		)
		user.eventRecorder = this.eventRecorder.slice(0)
		user.eventRecorder.push(new UserSuspended(
			user.ID,
			user.status
		))
		return user
	}

	reactive(this: User<UserStatus.Supended>): User<UserStatus.Active>{
		const user = new User(
			this.firstname,
			this.lastname,
			this.birthday,
			this.email,
			this.password,
			UserStatus.Active,
			this.ID
		)
		user.eventRecorder = this.eventRecorder.slice(0)
		user.eventRecorder.push(new UserReactivated(
			user.ID,
			user.status
		))
		return user
	}

	updateData(
		firstname: UserFirstName,
		lastname: UserLastName,
		birthday: UserBirthday,
		email: UserEmail,
		password: UserPassword,
	){
		this.firstname = firstname
		this.lastname = lastname
		this.birthday = birthday
		this.email = email
		this.password = password
		this.eventRecorder.push(new UserDataUpdated(
			this.ID,
			this.firstname,
			this.lastname,
			this.birthday,
			this.email,
			this.password
		))
	}

	deleteAccount(){
		if (this.cv) this.cv = undefined
		this.eventRecorder.push(new UserAccountDeleted(this.ID))
	}

	uploadCV(
		this: User<UserStatus.Unconfirmed>,
		academicFormation: CVAcademicFormation[],
		skills: CVSkills[],
		courses: CVCourses[],
	){
		//TODO delete this const
		const temp_id = new CVID(randomUUID())
		this.cv = CV.load(academicFormation, skills, courses, temp_id)
		this.eventRecorder =[...this.eventRecorder,...this.cv.getEvents()]
	}

	updateCV(
		this: User<UserStatus>,
		academicFormation: CVAcademicFormation[],
		skills: CVSkills[],
		courses: CVCourses[],
	){
		if (this.cv) { 
			this.cv.update(this.cv.getID(), skills, courses, academicFormation)
			this.eventRecorder =[...this.eventRecorder,...this.cv.getEvents()]
		}
	}

	protected invariants(){}

}

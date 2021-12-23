import {randomUUID} from "crypto";
import NotificationContent from "../job-offer/value-objects/Interview/interview/interview-notification/NotificationContent";
import { NotificationSubject } from "../notification/values_objects/NotificationSubject.value";
import {UserAccountDeleted} from "./domain_events/UserAccountDeleted.event";
import {UserConfirmed} from "./domain_events/UserConfirmed.event";
import {UserDataUpdated} from "./domain_events/UserDataUpdated.event";
import {UserReactivated} from "./domain_events/UserReactivated.event";
import {UserRegistered} from "./domain_events/UserRegistered.event";
import {UserSuspended} from "./domain_events/UserSuspended.event";
import {CV} from "./entities/CV.entity";
import { UserNotification } from "./entities/UserNotification";
import {CVStatus} from "./enums/CVStatus.enum";
import {UserStatus} from "./enums/UserStatus.enum";
import CVAcademicFormation from "./value_objects/CVAcademicFormation.value";
import CVCourses from "./value_objects/CVCourses.value";
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
	private _ID: UserID
	public status: S
	private eventRecorder: UserEvents[] = []
	
	private constructor(
		public firstname: UserFirstName,
		public lastname: UserLastName,
		public birthday: UserBirthday,
		public email: UserEmail,
		public password: UserPassword,
		status: S,
		id?: UserID,
		public cv?: CVType<S>
	){
		this.status = status
		this._ID = id || new UserID(randomUUID())
	}

	get ID(): UserID { return this._ID }
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

	suspend(this: User<UserStatus.Active | UserStatus.Unconfirmed>): User<UserStatus.Supended>{
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
		const subject = new NotificationSubject('Su cuenta ha sido suspendida');
		const content = new NotificationContent('Contactar a su empleador');
		const userNotification = new UserNotification(subject,content,user.ID);
		userNotification.sendSuspend();
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
		this.cv = CV.load(academicFormation, skills, courses)
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

	approveCV(
		this: User<UserStatus.Unconfirmed>,
	): User<UserStatus.Active> | undefined {
		if (this.cv) { 
			const cvApproved = this.cv.approve()
			const userActivated = new User(
				this.firstname,
				this.lastname,
				this.birthday,
				this.email,
				this.password,
				UserStatus.Active,
				this._ID,
				cvApproved
			)
			userActivated.eventRecorder = this.eventRecorder.slice(0)
			userActivated.eventRecorder =[...userActivated.eventRecorder,...cvApproved.getEvents()]
			return userActivated
		}
		return undefined
	}

	rejectCV(
		this: User<UserStatus.Unconfirmed>,
	){
		if (this.cv) { 
			this.cv = this.cv.reject()
			this.eventRecorder =[...this.eventRecorder,...this.cv.getEvents()]
		}
	}

	protected invariants(){}

}

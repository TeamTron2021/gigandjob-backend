import {randomUUID} from "crypto";
import {UserConfirmed} from "./domain_events/UserConfirmed.Event";
import {UserRegistered} from "./domain_events/UserRegistered.Event";
import {UserStatus} from "./enums/UserStatus.Enum";
import {UserBirthday} from "./value_objects/UserBirthday.value";
import {UserEmail} from "./value_objects/UserEmail.value";
import {UserFirstName} from "./value_objects/UserFirstName.value";
import {UserID} from "./value_objects/UserID.value";
import {UserLastName} from "./value_objects/UserLastName.value";
import {UserPassword} from "./value_objects/UserPassword.value";

type UserEvents = UserRegistered | UserConfirmed

export class User<S extends UserStatus>{
	private ID: UserID
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
	){
		this.status = status
		this.ID = id || new UserID(randomUUID())
	}

	getID(): UserID{ return this.ID }
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

	protected invariants(){}

}

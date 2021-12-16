import {randomUUID} from "crypto";
import {UserConfirmed} from "./domain_events/UserConfirmed.Event";
import {UserRegistered} from "./domain_events/UserRegistered.Event";
import {UserStatus} from "./enums/UserStatus.Enum";
import {UserBirthday} from "./value_objects/UserBirthday.ValueObject";
import {UserEmail} from "./value_objects/UserEmail.ValueObject";
import {UserFirstName} from "./value_objects/UserFirstName.ValueObject";
import {UserID} from "./value_objects/UserID.ValueObject";
import {UserLastName} from "./value_objects/UserLastName.ValueObject";
import {UserPassword} from "./value_objects/UserPassword.ValueObject";

type UserEvents = UserRegistered | UserConfirmed

export class User<S extends UserStatus>{
	public ID: UserID = new UserID(randomUUID())
	public status: S
	public eventRecorder: UserEvents[] = []
	
	private constructor(
		public firstname: UserFirstName,
		public lastname: UserLastName,
		public birthday: UserBirthday,
		public email: UserEmail,
		public password: UserPassword,
		status: S
	){
		this.status = status
	}

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
			UserStatus.Active
		)
		user.eventRecorder.push(new UserConfirmed(
			user.ID,
			user.status
		))
		user.eventRecorder = this.eventRecorder.slice(0)
		return user
	}

	protected invariants(){}

}

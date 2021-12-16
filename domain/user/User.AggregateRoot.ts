import {randomUUID} from "crypto";
import {UserStatus} from "./enums/UserStatus.Enum";
import {UserBirthday} from "./value_objects/UserBirthday.ValueObject";
import {UserEmail} from "./value_objects/UserEmail.ValueObject";
import {UserFirstName} from "./value_objects/UserFirstName.ValueObject";
import {UserID} from "./value_objects/UserID.ValueObject";
import {UserLastName} from "./value_objects/UserLastName.ValueObject";
import {UserPassword} from "./value_objects/UserPassword.ValueObject";

export class User<S extends UserStatus>{
	public ID: UserID = new UserID(randomUUID())
	public Status: S
	private EventRecorder = []
	
	private constructor(
		public Firstname: UserFirstName,
		public Lastname: UserLastName,
		public Birthday: UserBirthday,
		public Email: UserEmail,
		public Password: UserPassword,
		status: S
	){
		this.Status = status
	}

	static register<S extends UserStatus>(
		firstname: UserFirstName,
		lastname: UserLastName,
		birthday: UserBirthday,
		email: UserEmail,
		password: UserPassword,
		status: S
	): User<S>{
		const user = new User<S>(firstname,lastname,birthday,email,password,status)
		return user
	
	}

	protected invariants(){}

}

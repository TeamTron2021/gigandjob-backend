import {UserStatus} from "../enums/UserStatus.Enum";
import {UserBirthday} from "../value_objects/UserBirthday.ValueObject";
import {UserEmail} from "../value_objects/UserEmail.ValueObject";
import {UserFirstName} from "../value_objects/UserFirstName.ValueObject";
import {UserID} from "../value_objects/UserID.ValueObject";
import {UserLastName} from "../value_objects/UserLastName.ValueObject";
import {UserPassword} from "../value_objects/UserPassword.ValueObject";

export class UserRegistered{
	constructor(
		public ID: UserID,
		public firstname: UserFirstName,
		public lastname: UserLastName,
		public birthday: UserBirthday,
		public email: UserEmail,
		public password: UserPassword,
		public status: UserStatus
	){}
}

import {UserBirthday} from "../value_objects/UserBirthday.value";
import {UserEmail} from "../value_objects/UserEmail.value";
import {UserFirstName} from "../value_objects/UserFirstName.value";
import {UserID} from "../value_objects/UserID.value";
import {UserLastName} from "../value_objects/UserLastName.value";
import {UserPassword} from "../value_objects/UserPassword.value";

export class UserDataUpdated{
	constructor(
		public ID: UserID,
		public firstname: UserFirstName,
		public lastname: UserLastName,
		public birthday: UserBirthday,
		public email: UserEmail,
		public password: UserPassword,
	){}
}

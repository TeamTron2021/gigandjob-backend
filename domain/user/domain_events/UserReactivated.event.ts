import {UserStatus} from "../enums/UserStatus.enum";
import {UserID} from "../value_objects/UserID.value";

export class UserReactivated{
	constructor(
		public ID: UserID,
		public status: UserStatus.Active
	){}
}

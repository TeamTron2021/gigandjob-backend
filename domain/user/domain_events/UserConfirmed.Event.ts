import {UserStatus} from "../enums/UserStatus.Enum";
import {UserID} from "../value_objects/UserID.ValueObject";

export class UserConfirmed{
	constructor(
		public ID: UserID,
		public status: UserStatus
	){}
}

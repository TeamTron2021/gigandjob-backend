
import { CVStatus } from "../enums/CVStatus.enum";
import CVID from "../value_objects/CVID.value";

export class CVRejected{
	constructor(
		public ID: CVID,
		public status: CVStatus.Rejected
	){}
}
import { CVStatus } from "../enums/CVStatus.enum";
import { CVSkills } from "../value_objects/CVSkills.value";
import { CVAcademicFormation } from "../value_objects/CVAcademicFormation.value";
import { CVCourses } from "../value_objects/CVCourses.value";
import { CVID } from "../value_objects/CVID.value";


export class CVLoaded{
	constructor(
		public ID: CVID,
		public academicFormation: CVAcademicFormation,
		public CVSkills: CVSkills,
		public courses: CVCourses,
		public status: CVStatus
	){}
}

import {CVStatus} from "../enums/CVStatus.enum";
import CVAcademicFormation from "../value_objects/CVAcademicFormation.value";
import CVCourses from "../value_objects/CVCourses.value";
import CVID from "../value_objects/CVID.value";
import CVSkills from "../value_objects/CVSkills.value";

export class CVLoaded{
	constructor(
		public ID: CVID,
		public academicFormation: CVAcademicFormation[],
		public CVSkillsd: CVSkills[],
		public courses: CVCourses[],
		public status: CVStatus 
	){}
}

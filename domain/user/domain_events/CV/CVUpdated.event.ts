import CVAcademicFormation from "../../value_objects/CV/CVAcademicFormation.value";
import CVCourses from "../../value_objects/CV/CVCourses.value";
import CVID from "../../value_objects/CV/CVID.value";
import CVSkills from "../../value_objects/CV/CVSkills.value";

export class CVUpdated{
	constructor(
		public ID: CVID,
		public skills: CVSkills[],
		public courses: CVCourses[],
		public academicFormation: CVAcademicFormation[],
	){}
}
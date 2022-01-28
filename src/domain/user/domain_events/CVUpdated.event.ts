import CVAcademicFormation from '../value_objects/CVAcademicFormation.value';
import CVCourses from '../value_objects/CVCourses.value';
import CVID from '../value_objects/CVID.value';
import CVSkills from '../value_objects/CVSkills.value';

export class CVUpdated {
  constructor(
    public ID: CVID,
    public skills: CVSkills[],
    public courses: CVCourses[],
    public academicFormation: CVAcademicFormation[],
  ) {}
}

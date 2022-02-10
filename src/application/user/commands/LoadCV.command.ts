import { CV } from '../../../domain/user/entities/CV.entity';
import CVAcademicFormation from '../../../domain/user/value_objects/CVAcademicFormation.value';
import CVCourses from '../../../domain/user/value_objects/CVCourses.value';
import CVSkills from '../../../domain/user/value_objects/CVSkills.value';
import { CVCommand } from '../CV.command';
import { CVService } from '../CV.service';

export class LoadCV implements CVCommand {
  constructor(
    public readonly academicFormation: string,
    public readonly skills: string,
    public readonly courses: string,
  ) {}
  academics: CVAcademicFormation[] = [
    CVAcademicFormation.create(this.academicFormation),
  ];

  course: CVCourses[] = [CVCourses.create(this.courses)];

  skill: CVSkills[] = [CVSkills.create(this.skills)];

  execute(service: CVService) {
    const cv = CV.load(this.academics, this.skill, this.course);

    service.publish(cv.getEvents());
  }
}

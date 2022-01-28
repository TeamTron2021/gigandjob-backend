import { randomUUID } from 'crypto';
import { CVStatus } from '../enums/CVStatus.enum';
import CVAcademicFormation from '../value_objects/CVAcademicFormation.value';
import { CVLoaded } from '../domain_events/CVLoaded.event';
import CVCourses from '../value_objects/CVCourses.value';
import CVID from '../value_objects/CVID.value';
import CVSkills from '../value_objects/CVSkills.value';
import { CVUpdated } from '../domain_events/CVUpdated.event';
import { CVAproved } from '../domain_events/CVAproved.event';
import { CVRejected } from '../domain_events/CVRejected.event';

export type CVEvents = CVLoaded | CVUpdated | CVAproved | CVRejected;
export class CV<S extends CVStatus> {
  private ID: CVID;
  public status: S;
  private eventRecorder: CVEvents[] = [];

  constructor(
    public academicFormation: CVAcademicFormation[],
    public skills: CVSkills[],
    public courses: CVCourses[],
    status: S,
    id?: CVID,
  ) {
    this.status = status;
    this.ID = id || new CVID(randomUUID());
  }

  public getID(): CVID {
    return this.ID;
  }
  public getEvents() {
    return this.eventRecorder;
  }

  update(
    ID: CVID,
    skills: CVSkills[],
    courses: CVCourses[],
    academicFormation: CVAcademicFormation[],
  ) {
    this.ID = ID;
    this.skills = skills;
    this.courses = courses;
    this.academicFormation = academicFormation;
    this.eventRecorder.push(
      new CVUpdated(this.ID, this.skills, this.courses, this.academicFormation),
    );
  }

  static load(
    academicFormation: CVAcademicFormation[],
    skills: CVSkills[],
    courses: CVCourses[],
  ): CV<CVStatus.Unconfirmed> {
    const cv = new CV(academicFormation, skills, courses, CVStatus.Unconfirmed);
    cv.eventRecorder.push(
      new CVLoaded(
        cv.ID,
        cv.academicFormation,
        cv.skills,
        cv.courses,
        cv.status,
      ),
    );

    return cv;
  }

  approve(
    this: CV<CVStatus.Unconfirmed | CVStatus.Rejected>,
  ): CV<CVStatus.Aproved> {
    const cv = new CV(
      this.academicFormation,
      this.skills,
      this.courses,
      CVStatus.Aproved,
      this.ID,
    );
    cv.eventRecorder = this.eventRecorder.slice(0);
    cv.eventRecorder.push(new CVAproved(cv.ID, cv.status));

    return cv;
  }

  reject(
    this: CV<CVStatus.Unconfirmed | CVStatus.Rejected>,
  ): CV<CVStatus.Rejected> {
    const cv = new CV(
      this.academicFormation,
      this.skills,
      this.courses,
      CVStatus.Rejected,
      this.ID,
    );
    cv.eventRecorder = this.eventRecorder.slice(0);
    cv.eventRecorder.push(new CVRejected(cv.ID, cv.status));

    return cv;
  }

  isRejected(): this is CV<CVStatus.Rejected> {
    return this.status == CVStatus.Rejected;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected invariants() {}
}

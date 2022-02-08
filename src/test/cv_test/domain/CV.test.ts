import { randomUUID } from 'crypto';
import { CVAproved } from '../../../domain/user/domain_events/CVAproved.event';
import { CVLoaded } from '../../../domain/user/domain_events/CVLoaded.event';
import { CVRejected } from '../../../domain/user/domain_events/CVRejected.event';
import { CVUpdated } from '../../../domain/user/domain_events/CVUpdated.event';
import { CV } from '../../../domain/user/entities/CV.entity';
import CVAcademicFormation from '../../../domain/user/value_objects/CVAcademicFormation.value';
import CVCourses from '../../../domain/user/value_objects/CVCourses.value';
import CVID from '../../../domain/user/value_objects/CVID.value';
import CVSkills from '../../../domain/user/value_objects/CVSkills.value';

describe('Testing CV entity', () => {
  test('Should return a instance of CV and the CV is Loaded', () => {
    const skills: CVSkills = CVSkills.create([
      'SQL',
      'Mongo',
      'Inteligencia emocional',
    ]);

    const courses: CVCourses = CVCourses.create([
      'Excel',
      'Word',
      'Powerpoint',
    ]);

    const academics: CVAcademicFormation = CVAcademicFormation.create([
      'Primaria',
      'Bachiller',
      'Universitario',
    ]);

    const cv = CV.load(academics, skills, courses);
    expect(cv).toBeInstanceOf(CV);
    const event = new CVLoaded(
      cv.getID(),
      academics,
      skills,
      courses,
      cv.status,
    );
    expect(cv.getEvents()).toContainEqual(event);
  });

  test('Should update the CV', () => {
    const skills: CVSkills = CVSkills.create([
      'SQL',
      'Mongo',
      'Inteligencia emocional',
    ]);

    const courses: CVCourses = CVCourses.create([
      'Excel',
      'Word',
      'Powerpoint',
    ]);

    const academics: CVAcademicFormation = CVAcademicFormation.create([
      'Primaria',
      'Bachiller',
      'Universitario',
    ]);

    const id = CVID.create(randomUUID());
    const cv = CV.load(academics, skills, courses);

    const newSkills: CVSkills = CVSkills.create([
      'SQL',
      'Mongo',
      'Inteligencia emocional',
      'PowerBI',
    ]);

    const newCourses: CVCourses = CVCourses.create([
      'Excel',
      'Word',
      'Powerpoint',
      'Trello',
    ]);

    const newAcademics: CVAcademicFormation = CVAcademicFormation.create([
      'Primaria',
      'Bachiller',
      'Universitario',
      'Maestria',
    ]);

    cv.update(id, newSkills, newCourses, newAcademics);
    const event = new CVUpdated(
      cv.getID(),
      cv.skills,
      cv.courses,
      cv.academicFormation,
    );
    expect(cv.skills).toStrictEqual(newSkills);
    expect(cv.courses).toStrictEqual(newCourses);
    expect(cv.academicFormation).toStrictEqual(newAcademics);
    expect(cv.getEvents()).toContainEqual(event);
  });

  test('Should approve the CV', () => {
    const skills: CVSkills = CVSkills.create([
      'SQL',
      'Mongo',
      'Inteligencia emocional',
    ]);

    const courses: CVCourses = CVCourses.create([
      'Excel',
      'Word',
      'Powerpoint',
    ]);

    const academics: CVAcademicFormation = CVAcademicFormation.create([
      'Primaria',
      'Bachiller',
      'Universitario',
    ]);
    const cv = CV.load(academics, skills, courses);
    const cvAproved = cv.approve();
    const event = new CVAproved(cv.getID(), cvAproved.status);
    expect(cvAproved.getEvents()).toContainEqual(event);
    //expect(cvAproved.status).toBe()
  });

  test('Should reject the CV', () => {
    const skills: CVSkills = CVSkills.create([
      'SQL',
      'Mongo',
      'Inteligencia emocional',
    ]);

    const courses: CVCourses = CVCourses.create([
      'Excel',
      'Word',
      'Powerpoint',
    ]);

    const academics: CVAcademicFormation = CVAcademicFormation.create([
      'Primaria',
      'Bachiller',
      'Universitario',
    ]);
    const cv = CV.load(academics, skills, courses);
    const cvRejected = cv.reject();
    const event = new CVRejected(cv.getID(), cvRejected.status);
    expect(cvRejected.getEvents()).toContainEqual(event);
  });
});

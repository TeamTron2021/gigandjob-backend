import { randomUUID } from 'crypto';
import { CVAproved } from '../../src/domain/user/domain_events/CVAproved.event';
import { CVLoaded } from '../../src/domain/user/domain_events/CVLoaded.event';
import { CVRejected } from '../../src/domain/user/domain_events/CVRejected.event';
import { CVUpdated } from '../../src/domain/user/domain_events/CVUpdated.event';
import { CV } from '../../src/domain/user/entities/CV.entity';
import CVAcademicFormation from '../../src/domain/user/value_objects/CVAcademicFormation.value';
import CVCourses from '../../src/domain/user/value_objects/CVCourses.value';
import CVID from '../../src/domain/user/value_objects/CVID.value';
import CVSkills from '../../src/domain/user/value_objects/CVSkills.value';

describe('Testing CV entity', () => {
  test('Should return a instance of CV and the CV is Loaded', () => {
    const skills: CVSkills[] = [
      CVSkills.create('SQL'),
      CVSkills.create('Mongo'),
      CVSkills.create('Inteligencia emocional'),
    ];

    const courses: CVCourses[] = [
      CVCourses.create('Excel'),
      CVCourses.create('Word'),
      CVCourses.create('Powerpoint'),
    ];

    const academics: CVAcademicFormation[] = [
      CVAcademicFormation.create('Primaria'),
      CVAcademicFormation.create('Bachiller'),
      CVAcademicFormation.create('Universitario'),
    ];

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
    const skills: CVSkills[] = [
      CVSkills.create('SQL'),
      CVSkills.create('Mongo'),
      CVSkills.create('Inteligencia emocional'),
    ];

    const courses: CVCourses[] = [
      CVCourses.create('Excel'),
      CVCourses.create('Word'),
      CVCourses.create('Powerpoint'),
    ];

    const academics: CVAcademicFormation[] = [
      CVAcademicFormation.create('Primaria'),
      CVAcademicFormation.create('Bachiller'),
      CVAcademicFormation.create('Universitario'),
    ];

    const id = CVID.create(randomUUID());
    const cv = CV.load(academics, skills, courses);

    const newAcademics: CVAcademicFormation[] = [
      CVAcademicFormation.create('Primaria'),
      CVAcademicFormation.create('Bachiller'),
      CVAcademicFormation.create('Universitario'),
      CVAcademicFormation.create('Maestria'),
    ];

    const newCourses: CVCourses[] = [
      CVCourses.create('Excel'),
      CVCourses.create('Word'),
      CVCourses.create('Powerpoint'),
      CVCourses.create('Trello'),
    ];

    const newSkills: CVSkills[] = [
      CVSkills.create('SQL'),
      CVSkills.create('Mongo'),
      CVSkills.create('Inteligencia emocional'),
      CVSkills.create('Flutter'),
    ];

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
    const skills: CVSkills[] = [
      CVSkills.create('SQL'),
      CVSkills.create('Mongo'),
      CVSkills.create('Inteligencia emocional'),
    ];

    const courses: CVCourses[] = [
      CVCourses.create('Excel'),
      CVCourses.create('Word'),
      CVCourses.create('Powerpoint'),
    ];

    const academics: CVAcademicFormation[] = [
      CVAcademicFormation.create('Primaria'),
      CVAcademicFormation.create('Bachiller'),
      CVAcademicFormation.create('Universitario'),
    ];
    const cv = CV.load(academics, skills, courses);
    const cvAproved = cv.approve();
    const event = new CVAproved(cv.getID(), cvAproved.status);
    expect(cvAproved.getEvents()).toContainEqual(event);
    //expect(cvAproved.status).toBe()
  });

  test('Should reject the CV', () => {
    const skills: CVSkills[] = [
      CVSkills.create('SQL'),
      CVSkills.create('Mongo'),
      CVSkills.create('Inteligencia emocional'),
    ];

    const courses: CVCourses[] = [
      CVCourses.create('Excel'),
      CVCourses.create('Word'),
      CVCourses.create('Powerpoint'),
    ];

    const academics: CVAcademicFormation[] = [
      CVAcademicFormation.create('Primaria'),
      CVAcademicFormation.create('Bachiller'),
      CVAcademicFormation.create('Universitario'),
    ];
    const cv = CV.load(academics, skills, courses);
    const cvRejected = cv.reject();
    const event = new CVRejected(cv.getID(), cvRejected.status);
    expect(cvRejected.getEvents()).toContainEqual(event);
  });
});

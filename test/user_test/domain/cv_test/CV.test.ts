import {randomUUID} from "crypto";
import { CVLoaded } from "../../../../domain/user/domain_events/CV/CVLoaded.event";
import { CV } from "../../../../domain/user/entities/CV";
import CVAcademicFormation from "../../../../domain/user/value_objects/CV/CVAcademicFormation.value";
import CVCourses from "../../../../domain/user/value_objects/CV/CVCourses.value";
import CVID from "../../../../domain/user/value_objects/CV/CVID.value";
import CVSkills from "../../../../domain/user/value_objects/CV/CVSkills.value";

describe('Testing CV entity',()=>{
    it('Should return a instance of CV and the CV is Loaded',()=>{
        const skills: CVSkills[] = [
            CVSkills.create('SQL'), 
            CVSkills.create('Mongo'), 
            CVSkills.create('Inteligencia emocional')
        ];

        const courses: CVCourses[] = [
            CVCourses.create('Excel'),
            CVCourses.create('Word'),
            CVCourses.create('Powerpoint')
        ];

        const academics: CVAcademicFormation[] = [
            CVAcademicFormation.create('Primaria'),
            CVAcademicFormation.create('Bachiller'),
            CVAcademicFormation.create('Universitario')
        ];

        const id = CVID.create(randomUUID());
        const cv = CV.load(academics, skills, courses,id); 
        expect(cv).toBeInstanceOf(CV)
        const event = new CVLoaded(id, academics, skills, courses, cv.status)        
        expect(cv.getEvents()).toContainEqual(event)
    })
})
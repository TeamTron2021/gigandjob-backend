import { CVLoaded } from "../../../../domain/user/domain_events/CVLoaded.event";
import { CV } from "../../../../domain/user/entities/CV";
import CVAcademicFormation from "../../../../domain/user/value_objects/CVAcademicFormation.value";
import CVCourses from "../../../../domain/user/value_objects/CVCourses.value";
import CVID from "../../../../domain/user/value_objects/CVID.value";
import CVSkills from "../../../../domain/user/value_objects/CVSkills.value";
import UniqueId from "../../../../shared/domain/UniqueUUID";

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

        const id = CVID.create(new UniqueId().getId());
        const cv = CV.load(academics, skills, courses,id); 
        expect(cv).toBeInstanceOf(CV)
        const event = new CVLoaded(id, academics, skills, courses, cv.status)        
        expect(cv.getEvents()).toContainEqual(event)
    })
})
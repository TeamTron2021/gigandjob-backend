import { CVCoursesEmpty } from "../../../../domain/user/errors/CVCoursesEmpty.error";
import CVCourses from "../../../../domain/user/value_objects/CVCourses.value";

describe('Testing value object JobOfferSkill',()=>{
    it('Should thrown empty skill error',()=>{
        expect(() => CVCourses.create('')).toThrow(new CVCoursesEmpty());
    })
    it('Should thrown empty skill error',()=>{
        const course:any = null;
        expect(() => CVCourses.create(course)).toThrow(new CVCoursesEmpty());
    })
    it('Should return an instance of CVSkill',()=>{
        const course = 'Course'; 
        const cvCourse = CVCourses.create(course);
        const isCourse = cvCourse instanceof CVCourses;
        expect(isCourse).toBe(true);
    })
})
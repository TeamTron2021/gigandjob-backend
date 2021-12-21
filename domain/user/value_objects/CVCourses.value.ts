import { IValueObject } from "../../../shared/domain/IValueObject";
import { CVCoursesEmpty } from "../errors/CVCoursesEmpty.error";



export default class CVCourses implements IValueObject {
    constructor(private readonly course:string) {}

    equals(valueObject: CVCourses): boolean {
        return this.course === valueObject.getCourse();
    }

    public getCourse() {
        return this.course;
    }

    public static create(course: string) {
        if(course === '' || course === ' ' || course == undefined || course == null){
            throw new CVCoursesEmpty()
        }

        return new CVCourses(course);
    }
}
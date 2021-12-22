import { CVCoursesEmpty } from "../../errors/CV/CVCoursesEmpty.error";





export default class CVCourses {

    public readonly value: string

    constructor(value: string) { this.value = value}



    public getCourse() {
        return this.value;
    }

    public static create(course: string) {
        if(course === '' || course === ' ' || course == undefined || course == null){
            throw new CVCoursesEmpty()
        }

        return new CVCourses(course);
    }
}
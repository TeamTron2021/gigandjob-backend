import { CVCoursesEmpty } from '../errors/CVCoursesEmpty.error';

export default class CVCourses {
  public readonly value: string[];

  constructor(value: string[]) {
    this.value = value;
  }

  public getCourse() {
    return this.value;
  }

  public static create(course: string[]) {
    if (course == undefined || course == null || course.length == 0) {
      throw new CVCoursesEmpty();
    }

    return new CVCourses(course);
  }
}

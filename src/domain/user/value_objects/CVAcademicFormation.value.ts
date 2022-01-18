import { CVAcademicFormationEmpty } from '../errors/CVAcademicFormationEmpty.error';

export default class CVAcademicFormation {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public getAcademicFormation() {
    return this.value;
  }

  public static create(academic: string) {
    if (
      academic === '' ||
      academic === ' ' ||
      academic == undefined ||
      academic == null
    ) {
      throw new CVAcademicFormationEmpty();
    }

    return new CVAcademicFormation(academic);
  }
}

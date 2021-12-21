import { IValueObject } from "../../../shared/domain/IValueObject";
import { CVAcademicFormationEmpty } from "../errors/CVAcademicFormationEmpty.error";



export default class CVAcademicFormation implements IValueObject {
    constructor(private readonly academic:string) {}

    equals(valueObject: CVAcademicFormation): boolean {
        return this.academic === valueObject.getAcademicFormation();
    }

    public getAcademicFormation() {
        return this.academic;
    }

    public static create(academic: string) {
        if(academic === '' || academic === ' ' || academic == undefined || academic == null){
            throw new CVAcademicFormationEmpty();
        }

        return new CVAcademicFormation(academic);
    }
}
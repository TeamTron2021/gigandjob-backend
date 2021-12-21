import { IValueObject } from "../../../../shared/domain/IValueObject";
import InterviewEmptyDescriptionException from "../../exceptions/Interview/InterviewEmptyDescriptionException";

export default class InterviewDescription implements IValueObject {
    constructor(private readonly InterviewDescription: string) {}

    public equals(valueObject: InterviewDescription): boolean {
        return this.InterviewDescription == valueObject.InterviewDescription;
    }

    public static create(interviewDescription: string) {
        if(interviewDescription === '' || interviewDescription === ' ' || interviewDescription == null || interviewDescription == undefined) {
            throw new InterviewEmptyDescriptionException(
                'El titulo de la oferta no puede estar vacio'
            )
        }
        return new InterviewDescription(interviewDescription);
    }

    public getDescription(){
        return this.InterviewDescription;
    }

}
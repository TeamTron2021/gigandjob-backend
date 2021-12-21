import { IValueObject } from "../../../../shared/domain/IValueObject";
import InterviewEmptyTitleException from "../../exceptions/Interview/InterviewEmptyTitleException";

export default class InterviewTitle implements IValueObject {
    constructor(private readonly InterviewTittle: string) {}

    public equals(valueObject: InterviewTitle): boolean {
        return this.InterviewTittle == valueObject.InterviewTittle;
    }

    public static create(interviewTitle: string) {
        if(interviewTitle === '' || interviewTitle === ' ' || interviewTitle == null || interviewTitle == undefined) {
            throw new InterviewEmptyTitleException(
                'El titulo de la oferta no puede estar vacio'
            )
        }
        return new InterviewTitle(interviewTitle);
    }

    public getTitle(){
        return this.InterviewTittle;
    }

}
import { IValueObject } from "../../../../shared/domain/IValueObject";
import InterviewEmptyDirectionException from "../../exceptions/InPersonInterview/InterviewEmptyDirectionException";

export default class InPersonInterviewDirection implements IValueObject {
    constructor(private readonly InPersonInterviewDirection: string) {}

    public equals(valueObject: InPersonInterviewDirection): boolean {
        return this.InPersonInterviewDirection == valueObject.InPersonInterviewDirection;
    }

    public static create(InPersoninterviewDirection: string) {
        if(InPersoninterviewDirection === '' || InPersoninterviewDirection === ' ' || InPersoninterviewDirection == null || InPersoninterviewDirection == undefined) {
            throw new InterviewEmptyDirectionException(
                'El titulo de la oferta no puede estar vacio'
            )
        }
        return new InPersonInterviewDirection(InPersoninterviewDirection);
    }

    public getDirection(){
        return this.InPersonInterviewDirection;
    }

}
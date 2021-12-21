import { IValueObject } from "../../../../shared/domain/IValueObject";
import InterviewEmptyDirectionException from "../../exceptions/InPersonInterview/InterviewEmptyDirectionException";

export default class InPersonInterviewDirection implements IValueObject {
    constructor(private readonly direction: string) {}

    public equals(valueObject: InPersonInterviewDirection): boolean {
        return this.direction == valueObject.getDirection();
    }

    public static create(direction: string) {
        if(direction === '' || direction === ' ' || direction == null || direction == undefined) {
            throw new InterviewEmptyDirectionException(
                'La Direccion de la Entrevista no puede estar vacia'
            )
        }
        return new InPersonInterviewDirection(direction);
    }

    public getDirection(){
        return this.direction;
    }

}
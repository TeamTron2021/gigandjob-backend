import { IValueObject } from "../../../../../shared/domain/IValueObject";
import InterviewInvalidDateException from "../../../exceptions/Interview/Interview/InterviewInvalidDateException";
import InterviewMissingDateException from "../../../exceptions/Interview/Interview/InterviewMissingDateException";

export default class InterviewDate implements IValueObject {
    private constructor(private readonly startDate: Date,private readonly finalDate: Date) {}

    equals(valueObject: InterviewDate): boolean {    
        return this.startDate ===  valueObject.getStartDate() && this.finalDate === valueObject.getFinalDate();
    }

    public getStartDate(){
        return this.startDate;
    }

    public getFinalDate(){
        return this.finalDate;
    }

    public static create(startDate: Date, finalDate: Date){
        if(!startDate){
            throw new InterviewMissingDateException(
                'La fecha de inicio no puede estar vacia '
            );
        }

        if(!finalDate){
            throw new InterviewMissingDateException(
                'La fecha final no puede estar vacia '
            );
        }

        if(!(startDate instanceof Date)){
            throw new InterviewInvalidDateException(
                'La fecha de inicio es invalida'
            );
        }

        if(!(finalDate instanceof Date)){
            throw new InterviewInvalidDateException(
                'La fecha final es invalida'
            );
        }

        if(startDate > finalDate){
            throw new InterviewInvalidDateException(
                'La fecha de inicio no puede ser mayor a la fecha final'
            );
        }

        return new InterviewDate(startDate, finalDate);

    }

}
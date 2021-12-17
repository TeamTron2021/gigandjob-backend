import { IValueObject } from "../../../../shared/domain/IValueObject";
import GigAmountInvalidException from "../../exceptions/Gig/GigAmountInvalidException";
import GigEmptyTimeException from "../../exceptions/Gig/GigEmptyTimeException";

export default class GigDuration implements IValueObject {
    constructor(private readonly time: Time, private readonly amount: number){}

    public equals(valueObject: GigDuration): boolean {
        return this.time === valueObject.getTime() && this.amount === valueObject.getAmount();
    }

    public getTime(){
        return this.time;
    }
    public getAmount(){
        return this.amount;
    }

    public static create(time: Time, amount:number){
        if(time == undefined || time == null){
            throw new GigEmptyTimeException ('La unidad de tiempo de la duracion del gig no puede estar vacia');
        }
        if(amount <= 0 || amount == undefined || amount == null){
            throw new GigAmountInvalidException('La cantidad de tiempo no puede ser 0 o negativa')
        }

        return new GigDuration(time, amount);
    }
}
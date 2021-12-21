import { IValueObject } from "../../../../shared/domain/IValueObject";
import JobOfferEmptyDescriptionException from "../../exceptions/JobOffer/JobOfferEmptyDescriptionException";

export default class JobOfferDescription implements IValueObject {
    constructor(private readonly description: string) {    } 

    equals(valueObject: JobOfferDescription): boolean {
        return this.description === valueObject.getDescription();
    }

    public static create(description: string) {
        if(description === '' || description == undefined  || description ==  null || description === ' '){
            throw new JobOfferEmptyDescriptionException('La oferta tiene que tener una descripcion');
        }

        return new JobOfferDescription(description);
    }

    public getDescription(){
        return this.description;
    }
}
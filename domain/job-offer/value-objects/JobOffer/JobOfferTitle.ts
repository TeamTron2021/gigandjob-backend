import { IValueObject } from "../../../../shared/domain/IValueObject";
import JobOfferEmptyTitleException from "../../exceptions/JobOffer/JobOfferEmptyTitleException";

export default class JobOfferTItle implements IValueObject {
    constructor(private readonly jobOfferTittle: string) {}

    public equals(valueObject: JobOfferTItle): boolean {
        return this.jobOfferTittle == valueObject.jobOfferTittle;
    }

    public static create(jobOfferTitle: string) {
        if(jobOfferTitle === '' || jobOfferTitle === ' ' || jobOfferTitle == null || jobOfferTitle == undefined) {
            throw new JobOfferEmptyTitleException(
                'El titulo de la oferta no puede estar vacio'
            )
        }
        return new JobOfferTItle(jobOfferTitle);
    }

    public getTitle(){
        return this.jobOfferTittle;
    }

}
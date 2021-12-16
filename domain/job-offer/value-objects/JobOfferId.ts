
import { IValueObject } from '../../../shared/domain/IValueObject';
import EmptyJobOfferIdException from '../exceptions/JobOfferEmptyIdException';

export default class JobOfferId implements IValueObject {
    private constructor(readonly id: string) {}

    public equals(valueObject: JobOfferId): boolean {
        return this.id === valueObject.id;
    }

    public getId() {
        return this.id;
    }
    
    public static create(id: string) {
        if(id === '' || id === ' ' || id == undefined || id == null){
            throw new EmptyJobOfferIdException(
                'El id del empleador no puede estar vacio'
            );
        }

        return new JobOfferId(id);
    }

}
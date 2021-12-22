import { IValueObject } from "../../../../shared/domain/IValueObject";
import EmptyJobOfferComplaintIdException from "../../exceptions/JobOfferComplaint/JobOfferComplaintIdException";

export default class JobOfferComplaintId implements IValueObject {
    private constructor(readonly id: string) {}
  
    public equals(valueObject: JobOfferComplaintId ): boolean {
        return this.id === valueObject.getId();
    }
  
    public getId() {
        return this.id;
    }
    
    public static create(id: string) {
  
        if(id == undefined || id == null){
            throw new EmptyJobOfferComplaintIdException(
                'El id de JobOfferComplaint no puede estar vacio'
            );
        }
  
        if(!id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
          throw new EmptyJobOfferComplaintIdException(
              'El id de JobOfferComplaint no posee la estructura correcta'
          );
        }
    
        return new JobOfferComplaintId (id);
    }
  
  }
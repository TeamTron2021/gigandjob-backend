import { IValueObject } from "../../../../shared/domain/IValueObject";
import JobOfferMessageComplaint from "../../exceptions/JobOfferComplaint/JobOfferMessageComplaint";


export default class JobOfferComplaintMessage implements IValueObject {
    constructor(public readonly value: string) {}
  
    public equals(valueObject: JobOfferComplaintMessage): boolean {
        return this.value === valueObject.getId();
    }
  
    public getId() {
        return this.value;
    }
    
    public static create(value: string) {
  
        if(value== undefined || value == null){
            throw new  JobOfferMessageComplaint(
                'El message de JobOfferComplaintMessage no puede ser undefined o null'
            );
        }
   
        return new JobOfferComplaintMessage(value);
    }
  
  }
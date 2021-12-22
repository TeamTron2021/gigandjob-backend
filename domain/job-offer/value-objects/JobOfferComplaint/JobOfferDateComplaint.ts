import { IValueObject } from "../../../../shared/domain/IValueObject";
import EmptyJobOfferDateComplaintException from "../../exceptions/JobOfferComplaint/JobOfferDateComplaint";


export default class JobOfferComplaintDate implements IValueObject {
    private constructor(readonly date: Date) {}
  
    public equals(valueObject: JobOfferComplaintDate): boolean {
        return this.date === valueObject.getDate();
    }
  
    public getDate() {
        return this.date;
    }
    
    public static create(date: Date) {
  
        if(date == undefined || date == null){
            throw new EmptyJobOfferDateComplaintException(
                'La Fecha de JobOfferComplaint no puede estar vacio'
            );
        }
  
        if(date > new Date()){
          throw new EmptyJobOfferDateComplaintException(
              'La Fecha de JobOfferComplaint no puede ser mayor al dia de hoy'
          );
        }
    
        return new JobOfferComplaintDate(date);
    }
  
  }
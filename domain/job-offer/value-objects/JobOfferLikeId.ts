import { IValueObject } from "../../../shared/domain/IValueObject";
import EmptyJobOfferIdException from "../exceptions/JobOfferLikedIdExceptions";
//import { ValueObject } from "../../ValueObjects/ValueObjetcts";

export default class JobOfferLikedId implements IValueObject {
  private constructor(readonly id: string) {}

  public equals(valueObject: JobOfferLikedId): boolean {
      return this.id === valueObject.getId();
  }

  public getId() {
      return this.id;
  }
  
  public static create(id: string) {

      if(id == undefined || id == null){
          throw new EmptyJobOfferIdException(
              'El id de JobOfferLike no puede estar vacio'
          );
      }

      if(!id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)){
        throw new EmptyJobOfferIdException(
            'El id de JobOfferLike no posee la estructura correcta'
        );
      }
  
      return new JobOfferLikedId (id);
  }

}

import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IInterview } from "../entities/IInterview";


export class interviewCreated implements DomainEvents {
  public interview: IInterview;

  constructor (interview: IInterview) {
    this.interview = interview;
  }
  
  
}
import {IValueObject} from "../../../../shared/domain/IValueObject";
import NotificationEmptySubjectException from "../../exceptions/JobOffer/JobOfferNotificationSuject";

export class InterviewNotificationSubject implements IValueObject{
	
	constructor(private readonly subject:string){}
	
	public getSubject(){
		return this.subject;
	}
	
	public equals(valueObject: InterviewNotificationSubject): boolean{
		return this.subject === valueObject.getSubject();
	}
	
	public static create(subject: string): InterviewNotificationSubject {
		if(subject == null || subject == undefined){
			throw new NotificationEmptySubjectException('El motivo no puede estar vacío')
		}
		
		if(!subject.trim()){
			throw new NotificationEmptySubjectException('El motivo no puede estar vacío')
		}
		
		return new InterviewNotificationSubject(subject);
	}
}
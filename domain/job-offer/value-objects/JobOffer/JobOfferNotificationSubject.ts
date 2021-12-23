import { IValueObject } from "../../../../shared/domain/IValueObject";
import NotificationInvalidSubjectException from "../../exceptions/JobOffer/JobOfferNotificationInvalidSubjectException";
import NotificationEmptySubjectException from "../../exceptions/JobOffer/JobOfferNotificationSuject";

export class JobOfferNotificationSubject implements IValueObject{

    constructor(private readonly subject:string){}

    public getSubject(){
        return this.subject;
    }

    public equals(valueObject: JobOfferNotificationSubject): boolean {
        return this.subject === valueObject.getSubject();
    }

    public static create(subject:string){
        if(subject == null || subject == undefined){
            throw new NotificationEmptySubjectException('El motivo no puede estar vacio')
        }
        if(typeof subject !="string"){
            throw new NotificationInvalidSubjectException('El motivo tiene que ser un string');
        }
        if(!subject.trim()){
            throw new NotificationEmptySubjectException('El motivo no puede estar vacio')  
        }

        return new JobOfferNotificationSubject(subject);
    }
}
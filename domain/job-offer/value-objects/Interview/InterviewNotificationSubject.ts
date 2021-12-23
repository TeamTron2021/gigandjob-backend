import { IValueObject } from "../../../../shared/domain/IValueObject";

export class InterviewNotificationSubject implements IValueObject{

    constructor(private readonly subject:string){}

    public getSubject(){
        return this.subject;
    }

    public equals(valueObject: InterviewNotificationSubject): boolean{
        return this.subject === valueObject.getSubject();
    }


}
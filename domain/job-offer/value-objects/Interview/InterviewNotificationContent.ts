import { IValueObject } from "../../../shared/domain/IValueObject";

export class InterviewNotificationContent implements IValueObject{

    constructor(private readonly content:string){}

    public getContent(){
        return this.content;
    }

    public equals(valueObject: InterviewNotificationContent): boolean{
        return this.content === valueObject.getContent();
    }
    
}
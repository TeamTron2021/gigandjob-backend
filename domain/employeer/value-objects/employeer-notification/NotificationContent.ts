import { IValueObject } from "../../../../shared/domain/IValueObject";
import NotificationEmptyContentException from "../../exceptions/employeer-notification/NotificationEmptyContentException";
import NotificationInvalidContentException from "../../exceptions/employeer-notification/NotificationInvalidContentException";

export default class NotificationContent implements IValueObject {
    constructor(private readonly content:string){}

    public getContent(){
        return this.content;
    }

    public equals(valueObject: NotificationContent): boolean {
        return this.content === valueObject.getContent();
    }

    public static create(content:string){
        if(content == null || content == undefined){
            throw new NotificationEmptyContentException('El contenido no puede estar vacio')
        }
        if(typeof content !="string"){
            throw new NotificationInvalidContentException('El contenido tiene que ser un string');
        }
        if(!content.trim()){
            throw new NotificationEmptyContentException('El contenido no puede estar vacio')  
        }

        return new NotificationContent(content);
    }
}
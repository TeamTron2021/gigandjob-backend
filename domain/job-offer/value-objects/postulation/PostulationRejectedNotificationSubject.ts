import { IValueObject } from "../../../../shared/domain/IValueObject";
import PostulationNotificationEmptySubjectException from "../../exceptions/postulation/PostulationNotificationEmptySubjectException";
import PostulationNotificationInvalidSubjectException from "../../exceptions/postulation/PostulationNotificationInvalidSubjectException";


export default class PostulationNotificationSubject implements IValueObject {
    constructor(private readonly subject:string){}

    public getSubject(){
        return this.subject;
    }

    public equals(valueObject: PostulationNotificationSubject): boolean {
        return this.subject === valueObject.getSubject();
    }

    public static create(subject:string){
        if(subject == null || subject == undefined){
            throw new PostulationNotificationEmptySubjectException('El motivo no puede estar vacio')
        }
        if(typeof subject !="string"){
            throw new PostulationNotificationInvalidSubjectException('El motivo tiene que ser un string');
        }
        if(!subject.trim()){
            throw new PostulationNotificationEmptySubjectException('El motivo no puede estar vacio')  
        }

        return new PostulationNotificationSubject(subject);
    }
}
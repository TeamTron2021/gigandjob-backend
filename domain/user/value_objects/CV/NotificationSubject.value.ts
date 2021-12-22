import NotificationEmptySubjectException from "../../errors/CV/NotificationEmptySubject.error";
import NotificationInvalidSubjectException from "../../errors/CV/NotificationInvalidSubject.error";

export default class NotificationSubject{

    public readonly value: string


    constructor(value: string) { this.value = value}

    public getSubject(){
        return this.value;
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

        return new NotificationSubject(subject);
    }
}
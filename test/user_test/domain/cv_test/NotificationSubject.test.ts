import NotificationEmptySubjectException from "../../../../domain/user/errors/NotificationEmptySubject.error";
import NotificationInvalidSubjectException from "../../../../domain/user/errors/NotificationInvalidSubject.error";
import NotificationSubject from "../../../../domain/user/value_objects/NotificationSubject.value";

describe('Testing notification subject value object', ()=>{
    it('Should throw an empty notification subject error', ()=>{
        const subject: any = null 
        expect(()=>NotificationSubject.create(subject)).toThrow(new NotificationEmptySubjectException('El motivo no puede estar vacio'))
    });

    it('Should throw an empty notification subject error', ()=>{
        const subject: any = undefined
        expect(()=>NotificationSubject.create(subject)).toThrow(new NotificationEmptySubjectException('El motivo no puede estar vacio'))
    });
    it('Should throw an empty notification subject error', ()=>{
        const subject: any = '        ' 
        expect(()=>NotificationSubject.create(subject)).toThrow(new NotificationEmptySubjectException('El motivo no puede estar vacio'))
    });
    it('Should throw an empty notification subject error', ()=>{
        const subject: any = 8
        expect(()=>NotificationSubject.create(subject)).toThrow(new NotificationInvalidSubjectException('El motivo tiene que ser un string'));
    });
    it('Should return an instance of NotificationSubject',()=>{
        const subject ='Contenido generico'; 
        const notiSubject = NotificationSubject.create(subject); 
        const isSubject = notiSubject instanceof NotificationSubject; 
        expect(isSubject).toBe(true);
    })
})
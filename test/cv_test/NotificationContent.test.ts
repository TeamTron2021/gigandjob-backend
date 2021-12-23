import NotificationEmptyContentException from "../../domain/user/errors/NotificationEmptyContent.error";
import NotificationInvalidContentException from "../../domain/user/errors/NotificationInvalidContent.error";
import NotificationContent from "../../domain/user/value_objects/NotificationContent.value";


describe('Testing notification content value object', ()=>{
    it('Should throw an empty notification content error', ()=>{
        const content: any = null 
        expect(()=>NotificationContent.create(content)).toThrow(new NotificationEmptyContentException('El contenido no puede estar vacio'))
    });

    it('Should throw an empty notification content error', ()=>{
        const content: any = undefined
        expect(()=>NotificationContent.create(content)).toThrow(new NotificationEmptyContentException('El contenido no puede estar vacio'))
    });
    it('Should throw an empty notification content error', ()=>{
        const content: any = '        ' 
        expect(()=>NotificationContent.create(content)).toThrow(new NotificationEmptyContentException('El contenido no puede estar vacio'))
    });
    it('Should throw an empty notification content error', ()=>{
        const content: any = 8
        expect(()=>NotificationContent.create(content)).toThrow(new NotificationInvalidContentException('El contenido tiene que ser un string'));
    });
    it('Should return an instance of NotificationContent',()=>{
        const content ='Contenido generico'; 
        const notiContent = NotificationContent.create(content); 
        const isContent = notiContent instanceof NotificationContent; 
        expect(isContent).toBe(true);
    })
})

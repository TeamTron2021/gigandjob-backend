import NotificationInvalidSubjectException from "../../../../../domain/job-offer/exceptions/Interview/Interview/interview-notification/NotificationInvalidSubjectException";
import NotificationEmptySubjectException from "../../../../../domain/job-offer/exceptions/JobOffer/JobOfferNotificationSuject";
import { JobOfferNotificationSubject } from "../../../../../domain/job-offer/value-objects/JobOffer/JobOfferNotificationSubject";

describe('Testing notification subject value object', ()=>{
    test('Should throw an empty notification subject error', ()=>{
        const subject: any = null 
        expect(()=>JobOfferNotificationSubject.create(subject)).toThrow(new NotificationEmptySubjectException('El motivo no puede estar vacio'))
    });

    test('Should throw an empty notification subject error', ()=>{
        const subject: any = undefined
        expect(()=>JobOfferNotificationSubject.create(subject)).toThrow(new NotificationEmptySubjectException('El motivo no puede estar vacio'))
    });
    test('Should throw an empty notification subject error', ()=>{
        const subject: any = '        ' 
        expect(()=>JobOfferNotificationSubject.create(subject)).toThrow(new NotificationEmptySubjectException('El motivo no puede estar vacio'))
    });
    test('Should throw an empty notification subject error', ()=>{
        const subject: any = 8
        expect(()=>JobOfferNotificationSubject.create(subject)).toThrow(new NotificationInvalidSubjectException('El motivo tiene que ser un string'));
    });
    test('Should return an instance of Notification Subject',()=>{
        const subject ='Subject'; 
        const notiSubject = JobOfferNotificationSubject.create(subject); 
        const isSubject = notiSubject instanceof JobOfferNotificationSubject; 
        expect(isSubject).toBe(true);
    })
})
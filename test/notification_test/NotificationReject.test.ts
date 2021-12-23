import Interview from "../../domain/job-offer/entities/Interview";
import InterviewNotification from "../../domain/job-offer/entities/InterviewNotification"
import { InterviewStatus } from "../../domain/job-offer/shared/InterviewStatus.enum";
import NotificationContent from "../../domain/job-offer/value-objects/Interview/interview/interview-notification/NotificationContent";
import NotificationSubject from "../../domain/job-offer/value-objects/Interview/interview/interview-notification/NotificationSubject";
import InterviewDate from "../../domain/job-offer/value-objects/Interview/interview/InterviewDate";
import InterviewDescription from "../../domain/job-offer/value-objects/Interview/interview/InterviewDescription";
import InterviewId from "../../domain/job-offer/value-objects/Interview/interview/InterviewId";
import InterviewInterviewed from "../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewed";
import InterviewInterviewer from "../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewer";
import InterviewTitle from "../../domain/job-offer/value-objects/Interview/interview/InterviewTitle";
import UniqueId from "../../shared/domain/UniqueUUID";

const initialDate = new Date(); 
const finalDate = new Date(); 
initialDate.setDate(finalDate.getDate() -1);
const date = InterviewDate.create(
    initialDate, 
    finalDate
);
const id = InterviewId.create(new UniqueId().getId());
const interviewed = InterviewInterviewed.create(new UniqueId().getId());
const interviewer = InterviewInterviewer.create(new UniqueId().getId());
const interviewTitle = InterviewTitle.create('Titulo generico de una entrevista');
const interviewDescription = InterviewDescription.create('Descripcion generica de una entrevista de trabajo');

describe('Test in notification reject no empty',()=>{
    test('Test notification reject',()=>{
        const interview =  Interview.create(
            interviewTitle,
            interviewDescription,
            date,
            interviewed,
            interviewer,
              id,
        );
        const subjec = new NotificationSubject('Entrevista rechazada');
        const content = new NotificationContent('prueba de contenido');
    
        const interviewNotification = new InterviewNotification(subjec,content,interview);
        console.log(interviewNotification.sendRejected());
    })
    
})
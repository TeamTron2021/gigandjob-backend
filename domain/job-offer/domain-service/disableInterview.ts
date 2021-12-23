import IDomainEvent from "../../../shared/domain/IDomainEvent";
import Interview from "../entities/Interview";
import InterviewNotification from "../entities/InterviewNotification";
import InterviewCurrentlyDisabledException from "../exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import NotificationContent from "../value-objects/Interview/interview/interview-notification/NotificationContent";
import NotificationSubject from "../value-objects/Interview/interview/interview-notification/NotificationSubject";



export default class disableInterview{

    public disableInterviews(
        this: Interview<InterviewStatus.enable>
    ): Interview<InterviewStatus.disabled>{

        
        const interviewDisable = new Interview(
            this.title,
            this.description,
            this.date,
            this.interviewed,
            this.interviewer,
            InterviewStatus.disabled,
            this.Id
        );

        const subject = new NotificationSubject('Interview ha sido deshabilitada');
        const content = new NotificationContent('');
        const interviewNotification =new InterviewNotification(subject,content,interviewDisable);
        interviewNotification.sendDisable();
        return interviewDisable;
    }


}
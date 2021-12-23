import IDomainEvent from "../../../shared/domain/IDomainEvent";
import InterviewRegistered from "../domain-events/interview/interview/notifications/InterviewRegistered.Event";
import InterviewRescheduledNotification from "../domain-events/interview/interview/notifications/InterviewRescheduledNotification.Event";
import { InterviewRejectedNotification } from "../domain-events/interview/interview/notifications/InterviewRejectedNotification.Event";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import NotificationContent from "../value-objects/Interview/interview/interview-notification/NotificationContent";
import NotificationSubject from "../value-objects/Interview/interview/interview-notification/NotificationSubject";
import Interview from "./Interview";

export default class InterviewNotification {
    private eventRecorder: IDomainEvent[] = []; 
    constructor(
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent, 
        private readonly interview: Interview<InterviewStatus>,
    ) {

    }

    public static register(
        subject: NotificationSubject,
        content: NotificationContent, 
        interview: Interview<InterviewStatus>
    ) {
        const interviewNotification = new InterviewNotification(subject, content, interview);
        interviewNotification.eventRecorder.push(new InterviewRegistered(subject, content)); 
        return interviewNotification;
    }

    public sendRescheduled() {
        this.eventRecorder.push(
            new InterviewRescheduledNotification(
                this.interview.getInterviewId(), this.subject, this.content))
    }

    public sendRejected(){
      
       this.eventRecorder.push(
           new InterviewRejectedNotification(
                this.interview.getInterviewId(),this.subject,this.content))
    }
}
import IDomainEvent from "../../../shared/domain/IDomainEvent";
import InterviewRegistered from "../domain-events/interview/interview/notifications/InterviewRegistered.Event";
import InterviewRescheduledNotification from "../domain-events/interview/interview/notifications/InterviewRescheduledNotification.Event";
import IInterview from "../shared/IInterview";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import NotificationContent from "../value-objects/Interview/interview/interview-notification/NotificationContent";
import NotificationSubject from "../value-objects/Interview/interview/interview-notification/NotificationSubject";
import Interview from "./Interview";

export default class InterviewNotification {
    private eventRecorder: IDomainEvent[] = []; 
    constructor(
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent, 
        private readonly interview: IInterview,
    ) {

    }

    public static register(
        subject: NotificationSubject,
        content: NotificationContent, 
        interview: IInterview
    ) {
        const interviewNotification = new InterviewNotification(subject, content, interview);
        interviewNotification.eventRecorder.push(new InterviewRegistered(subject, content)); 
        return interviewNotification;
    }

    public sendRescheduled() {
        this.eventRecorder.push(new InterviewRescheduledNotification(this.interview.getInterviewId(), this.subject, this.content))
    }
}
import IDomainEvent from "../../../../../shared/domain/IDomainEvent";
import NotificationContent from "../../../value-objects/interview/interview-notification/NotificationContent";
import NotificationSubject from "../../../value-objects/interview/interview-notification/NotificationSubject";
import InterviewId from "../../../value-objects/interview/InterviewId";


export default class InterviewRescheduledNotification implements IDomainEvent {
    constructor(
        public idInterview:  InterviewId, 
        public subject: NotificationSubject, 
        public content: NotificationContent, 
    ){}
}
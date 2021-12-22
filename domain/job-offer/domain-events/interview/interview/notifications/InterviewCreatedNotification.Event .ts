import IDomainEvent from "../../../../../../shared/domain/IDomainEvent";
import NotificationContent from "../../../../value-objects/Interview/interview/interview-notification/NotificationContent";
import NotificationSubject from "../../../../value-objects/Interview/interview/interview-notification/NotificationSubject";
import InterviewId from "../../../../value-objects/Interview/interview/InterviewId";


export default class InterviewCreatedNotification implements IDomainEvent {
    constructor(
        public idInterview:  InterviewId, 
        public subject: NotificationSubject, 
        public content: NotificationContent, 
    ){}
}
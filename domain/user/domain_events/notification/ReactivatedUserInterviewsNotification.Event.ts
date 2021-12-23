import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import NotificationContent from "../../../job-offer/value-objects/Interview/interview/interview-notification/NotificationContent";
import NotificationSubject from "../../../job-offer/value-objects/Interview/interview/interview-notification/NotificationSubject";
import InterviewId from "../../../job-offer/value-objects/Interview/interview/InterviewId";
import { UserID } from "../../value_objects/UserID.value";

export default class ReactivatedUserInterviewsNotification implements IDomainEvent{
    constructor(
        public id: UserID,
        public idInterview: InterviewId,
        public subject: NotificationSubject,
        public content: NotificationContent,
    ){}
}

import IDomainEvent from "../../../../../../shared/domain/IDomainEvent";
import InterviewId from "../../../../value-objects/Interview/interview/InterviewId";
import { InterviewNotificationContent } from "../../../../value-objects/Interview/InterviewNotificationContent";
import { InterviewNotificationSubject } from "../../../../value-objects/Interview/InterviewNotificationSubject";


export default class InterviewCanceledNotification implements IDomainEvent{
    constructor(
        public id: InterviewId,
        public subject: InterviewNotificationSubject,
        public content: InterviewNotificationContent,

    ){}
}
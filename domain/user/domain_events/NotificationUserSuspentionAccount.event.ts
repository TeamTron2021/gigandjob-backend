import IDomainEvent from "../../../shared/domain/IDomainEvent";
import NotificationContent from "../../job-offer/value-objects/Interview/interview/interview-notification/NotificationContent";
import { NotificationSubject } from "../../notification/values_objects/NotificationSubject.value";
import { UserID } from "../value_objects/UserID.value";

export class NotificationUserSuspentionAccount implements IDomainEvent{
    constructor(
        userId: UserID,
        subject: NotificationSubject,
        content: NotificationContent
    ){}
    
}
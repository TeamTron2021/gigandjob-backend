import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import NotificationContent from "../../value-objects/employeer-notification/NotificationContent";
import NotificationSubject from "../../value-objects/employeer-notification/NotificationSubject";
export default class EmployeerRegistered implements IDomainEvent {
    constructor(
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent, 
    ) {

    }

}
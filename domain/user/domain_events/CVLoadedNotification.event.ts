import IDomainEvent from "../../../shared/domain/IDomainEvent";
import NotificationContent from "../value_objects/NotificationContent.value";
import NotificationSubject from "../value_objects/NotificationSubject.value";

export default class CVLoadedNotification implements IDomainEvent {
    constructor(
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent, 
    ) {

    }

}
import IDomainEvent from "../../../shared/domain/IDomainEvent";
import CVLoadedNotification from "../domain_events/CVLoadedNotification.event";
import { CVStatus } from "../enums/CVStatus.enum";
import NotificationContent from "../value_objects/NotificationContent.value";
import NotificationSubject from "../value_objects/NotificationSubject.value";
import { CV } from "./CV";

export default class CVNotification {
    private eventRecorder: IDomainEvent[] = []; 
    constructor(
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent, 
        private readonly CV: CV<CVStatus>,
    ) {

    }

    public loadedNotification(){
        this.eventRecorder.push(new CVLoadedNotification(this.CV.getID(), this.subject, this.content))
    }

}




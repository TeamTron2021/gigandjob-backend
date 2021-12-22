import CVLoadedNotification from "../domain_events/CVLoadedNotification.event";
import { CVStatus } from "../enums/CVStatus.enum";
import NotificationContent from "../value_objects/NotificationContent.value";
import NotificationSubject from "../value_objects/NotificationSubject.value";
import {CV} from "./CV.entity";

type CVNotificationEvents = CVLoadedNotification
export default class CVNotification {
    private eventRecorder: CVNotificationEvents[] = []; 
    constructor(
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent, 
        private readonly CV: CV<CVStatus>,
    ) {

    }
    getEvents(): CVNotificationEvents[] {return this.eventRecorder}

    public loadedNotification(){
        this.eventRecorder.push(new CVLoadedNotification(this.CV.getID(), this.subject, this.content))
    }

}




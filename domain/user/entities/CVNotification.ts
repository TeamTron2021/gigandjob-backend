

import CVLoadedNotification from "../domain_events/CV/CVLoadedNotification.event";
import { CVStatus } from "../enums/CVStatus.enum";
import NotificationContent from "../value_objects/CV/NotificationContent.value";
import NotificationSubject from "../value_objects/CV/NotificationSubject.value";
import { CV } from "./CV";

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




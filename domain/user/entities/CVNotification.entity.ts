import CVAprovedNotification from "../domain_events/CVAprovedNotification.event";
import CVLoadedNotification from "../domain_events/CVLoadedNotification.event";
import CVRejectedNotification from "../domain_events/CVRejectedNotification.event";
import { CVStatus } from "../enums/CVStatus.enum";
import NotificationContent from "../value_objects/NotificationContent.value";
import NotificationSubject from "../value_objects/NotificationSubject.value";
import {CV} from "./CV.entity";

type CVNotificationEvents = CVLoadedNotification | CVAprovedNotification | CVRejectedNotification
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

    public approvedNotification(){
        this.eventRecorder.push(new CVAprovedNotification(this.CV.getID(), this.subject, this.content))
    }

    public rejectedNotification(){
        this.eventRecorder.push(new CVRejectedNotification(this.CV.getID(), this.subject, this.content))
    }

}




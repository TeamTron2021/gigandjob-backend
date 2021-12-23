import IDomainEvent from "../../../shared/domain/IDomainEvent";
import EmployeerReactivedNotification from "../domain-events/notifications/EmployeerReactivedNotification.Event";
import EmployeerRegistered from "../domain-events/notifications/EmployeerRegistered.Event";
import EmployeerSuspendedNotification from "../domain-events/notifications/EmployeerSuspendedNotification.Event";
import { EmployeerStatus } from "../shared/EmployeerStatus.enum";
import NotificationContent from "../value-objects/employeer-notification/NotificationContent";
import NotificationSubject from "../value-objects/employeer-notification/NotificationSubject";
import Employeer from "./Employeer.aggregate";

export default class EmployeerNotification {
    private eventRecorder: IDomainEvent[] = []; 
    constructor(
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent, 
        private readonly Employeer: Employeer<EmployeerStatus>,
    ) {

    }

    public static register(
        subject: NotificationSubject,
        content: NotificationContent, 
        employeer: Employeer<EmployeerStatus>
    ) {
        const employeerNotification = new EmployeerNotification(subject, content, employeer);
        employeerNotification.eventRecorder.push(new EmployeerRegistered(subject, content)); 
        return employeerNotification;
    }

    public sendSuspension() {
        this.eventRecorder.push(new EmployeerSuspendedNotification(this.Employeer.getId(), this.subject, this.content))
    }

    public sendReactivation() {
        this.eventRecorder.push(new EmployeerReactivedNotification(this.Employeer.getId(), this.subject, this.content))
    }
    
}
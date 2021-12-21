import IDomainEvent from "../../../shared/domain/IDomainEvent";
import EmployeerRegistered from "../domain-events/notifications/EmployeerRegistered.Event";
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

}
import IDomainEvent from "../../../shared/domain/IDomainEvent";
import NotificationContent from "../../job-offer/value-objects/Interview/interview/interview-notification/NotificationContent";
import { NotificationSubject } from "../../notification/values_objects/NotificationSubject.value";
import { NotificationUserSuspentionAccount } from "../domain_events/NotificationUserSuspentionAccount.event";
import { UserID } from "../value_objects/UserID.value";

export class UserNotification{
    private eventRecorder: IDomainEvent[] = [];

    constructor(
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent,
        private readonly userId: UserID
    ){}

    public sendSuspend(): void{
        this.eventRecorder.push(
            new NotificationUserSuspentionAccount(this.userId,this.subject,this.content)
        );

    }
}
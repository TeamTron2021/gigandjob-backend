import IDomainEvent from "../../../shared/domain/IDomainEvent";
import JobOfferSuspendedNotification from "../domain-events/job-offer/Notification/JobOfferSuspendedNotification";
import { OfferStatus } from "../shared/OfferStatus.enum";
import { JobOfferNotificationContent } from "../value-objects/JobOffer/JobOfferNotificationContent";
import { JobOfferNotificationSubject } from "../value-objects/JobOffer/JobOfferNotificationSubject";
import JobOffer from "./JobOffer.aggregate";

export default class JobOfferNotification {
    private eventRecorder: IDomainEvent[] = []; 
    constructor(
        private readonly subject: JobOfferNotificationSubject,
        private readonly content: JobOfferNotificationContent, 
        private readonly JobOffer: JobOffer<OfferStatus>,
    ) {}

    public sendSuspensionOffer() {
        this.eventRecorder.push(new JobOfferSuspendedNotification(this.JobOffer.getOfferId(), this.subject, this.content))
    }

}
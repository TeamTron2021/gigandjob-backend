import IDomainEvent from "../../../../../shared/domain/IDomainEvent";
import JobOfferId from "../../../value-objects/JobOffer/JobOfferId";
import { JobOfferNotificationContent } from "../../../value-objects/JobOffer/JobOfferNotificationContent";
import { JobOfferNotificationSubject } from "../../../value-objects/JobOffer/JobOfferNotificationSubject";

export default class JobOfferSuspendedNotification implements IDomainEvent{
    constructor(
        public id: JobOfferId, 
        public subject: JobOfferNotificationSubject, 
        public content: JobOfferNotificationContent, 
        ){}

}
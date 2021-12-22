import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import JobOfferComplaintMessage from "../../value-objects/JobOfferComplaint/JobOfferComplaintMessage";
import JobOfferComplaintIssue from "../../value-objects/JobOfferComplaint/JobOfferIssueComplaint";

export default class ComplaintNotificationEvent implements IDomainEvent {
   
    constructor(
        private message: JobOfferComplaintMessage, 
    ) {}


}
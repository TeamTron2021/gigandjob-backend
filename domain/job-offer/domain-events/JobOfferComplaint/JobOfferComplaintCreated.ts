import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import JobOfferComplaintId from "../../value-objects/JobOfferComplaint/JobOfferComplaitId";
import JobOfferComplaintDate from "../../value-objects/JobOfferComplaint/JobOfferDateComplaint";
import JobOfferComplaintIssue from "../../value-objects/JobOfferComplaint/JobOfferIssueComplaint";

export default class JobOfferComplaintCreated implements IDomainEvent{

	constructor(
        private id: JobOfferComplaintId,
    	private issue: JobOfferComplaintIssue,
        private dateComplaint: JobOfferComplaintDate,
        private acceptedOrRejected: boolean | null
    ){}

}
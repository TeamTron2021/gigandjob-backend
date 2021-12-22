import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import { JobOfferComplaint } from "../../entities/JobOfferComplaint";
import JobOfferComplaintId from "../../value-objects/JobOfferComplaint/JobOfferComplaitId";



export default class JobOfferAceptedandRejectedComplaint implements IDomainEvent{

	constructor(
        private id: JobOfferComplaintId,
        private jobOfferComplaint: boolean
    ){}

}
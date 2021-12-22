import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import { JobOfferComplaint } from "../../entities/JobOfferComplaint";
import { JobOfferLike } from "../../entities/JobOfferLike";
import { OfferStatus } from "../../shared/OfferStatus.enum";
import JobOfferDate from "../../value-objects/JobOffer/JobOfferDate";
import JobOfferDescription from "../../value-objects/JobOffer/JobOfferDescription";
import JobOfferId from "../../value-objects/JobOffer/JobOfferId";
import JobOfferSalary from "../../value-objects/JobOffer/JobOfferSalary";
import JobOfferSkill from "../../value-objects/JobOffer/JobOfferSkill";
import JobOfferTItle from "../../value-objects/JobOffer/JobOfferTitle";
import JobOfferVacant from "../../value-objects/JobOffer/JobOfferVacant";

export default class JobOfferModified implements IDomainEvent{
    constructor(
        public Id: JobOfferId,
        public description: JobOfferDescription, 
        public salary: JobOfferSalary, 
        public skills: JobOfferSkill[], 
        public title: JobOfferTItle, 
        public vacant: JobOfferVacant, 
        public likes: JobOfferLike[],
        public complaint: JobOfferComplaint[],
        public date: JobOfferDate,
        public status: OfferStatus
    ){};
}
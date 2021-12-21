import IDomainEvent from "../../../shared/domain/IDomainEvent";
import GigCreated from "../domain-events/gig/GigCreated.Event";
import IJobOffer from "../shared/IJobOffer";
import { OfferStatus } from "../shared/OfferStatus.enum";
import GigDuration from "../value-objects/Gig/JobOfferGigDuration";
import JobOfferDate from "../value-objects/JobOffer/JobOfferDate";
import JobOfferDescription from "../value-objects/JobOffer/JobOfferDescription";
import JobOfferId from "../value-objects/JobOffer/JobOfferId";
import JobOfferSalary from "../value-objects/JobOffer/JobOfferSalary";
import JobOfferSkill from "../value-objects/JobOffer/JobOfferSkill";
import JobOfferTItle from "../value-objects/JobOffer/JobOfferTitle";
import JobOfferVacant from "../value-objects/JobOffer/JobOfferVacant";

export default class Gig <S extends OfferStatus> implements IJobOffer{
    private eventRecorder: IDomainEvent[] = [];
    public status: S;
    constructor(public description: JobOfferDescription, 
        public salary: JobOfferSalary, 
        public skills: JobOfferSkill[], 
        public title: JobOfferTItle, 
        public vacant: JobOfferVacant, 
        public date: JobOfferDate,
        status: S,
        Id: JobOfferId,
        public gigDuration: GigDuration,)
        {
            this.status = status;
    } 

    public addEvent(domainEvent: IDomainEvent){
        this.eventRecorder.push(domainEvent);
    }

    
    static create( 
        description: JobOfferDescription,
        salary: JobOfferSalary,
        skills: JobOfferSkill[],
        title: JobOfferTItle,
        vacant: JobOfferVacant,
        date: JobOfferDate,
        Id: JobOfferId,
        gigDuration: GigDuration,
    ){
        const gig = new Gig(description, salary,skills, title, vacant, date, OfferStatus.notPublished, Id, gigDuration );
        gig.addEvent(new GigCreated(Id,description,salary,skills,title,vacant,date, OfferStatus.notPublished, gigDuration));
        return gig;
    }

    protected invariants() {}
}
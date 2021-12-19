import IDomainEvent from "../../../shared/domain/IDomainEvent";
import JobOfferCreated from "../domain-events/job-offer/JobOfferCreated.Event";
import GigDuration from "../value-objects/Gig/JobOfferGigDuration";
import JobOfferDate from "../value-objects/JobOffer/JobOfferDate";
import JobOfferDescription from "../value-objects/JobOffer/JobOfferDescription";
import JobOfferId from "../value-objects/JobOffer/JobOfferId";
import JobOfferSalary from "../value-objects/JobOffer/JobOfferSalary";
import JobOfferSkill from "../value-objects/JobOffer/JobOfferSkill";
import JobOfferTItle from "../value-objects/JobOffer/JobOfferTitle";
import JobOfferVacant from "../value-objects/JobOffer/JobOfferVacant";

export default class JobOffer<S extends OfferStatus>  {
    private eventRecorder: IDomainEvent[] = [];
    public status: S;
    constructor ( 
        public description: JobOfferDescription, 
        public salary: JobOfferSalary, 
        public skills: JobOfferSkill[], 
        public title: JobOfferTItle, 
        public vacant: JobOfferVacant, 
        public date: JobOfferDate,
        status: S,
        private Id: JobOfferId,){   
        this.status =  status;

    }

    public getOfferId(){
        return this.Id;
    }
    public getEvents(){
        return this.eventRecorder;
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
        _gigDuration?: GigDuration,
    ){
        const offer = new JobOffer(description, salary,skills, title, vacant, date, OfferStatus.notPublished, Id, );
        offer.eventRecorder.push(new JobOfferCreated(Id,description,salary,skills,title,vacant,date, OfferStatus.notPublished));
    }


    protected invariants() {}
}
import IDomainEvent from "../../../shared/domain/IDomainEvent";
import JobOfferCreated from "../domain-events/job-offer/JobOfferCreated.Event";
import JobOfferModified from "../domain-events/job-offer/JobOfferModified";
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
import { PostulationStatus } from "../value-objects/postulation/PostulationStatus";
import { JobOfferComplaint } from "./JobOfferComplaint";
import { JobOfferLike } from "./JobOfferLike";
import { Postulation } from "./postulation";


export default class JobOffer<S extends OfferStatus> implements IJobOffer {
    private eventRecorder: IDomainEvent[] = [];
    private postulations: Postulation<PostulationStatus>[] = [];
    public status: S;
    constructor ( 
        public description: JobOfferDescription, 
        public salary: JobOfferSalary, 
        public skills: JobOfferSkill[], 
        public title: JobOfferTItle, 
        public vacant: JobOfferVacant, 
        public likes: JobOfferLike[],
        public complaint: JobOfferComplaint[],
        public date: JobOfferDate,
        status: S,
        private Id: JobOfferId,){   
        this.status =  status;

    }
    public getPostulations(): Postulation<PostulationStatus>[] {
        return this.postulations;
    }

    public addPostulation(postulation: Postulation<PostulationStatus>): void {
        this.postulations.push(postulation)
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
        likes: JobOfferLike[],
        complaint: JobOfferComplaint[],
        date: JobOfferDate,
        Id: JobOfferId,
        _gigDuration?: GigDuration,
    ){
        const offer = new JobOffer(description, salary,skills, title, vacant, likes, complaint, date, OfferStatus.notPublished, Id, );
        offer.eventRecorder.push(new JobOfferCreated(Id,description,salary,skills,title,vacant,likes,complaint,date, OfferStatus.notPublished));
        return offer;
    }
    modified( 
        description: JobOfferDescription,
        salary: JobOfferSalary,
        skills: JobOfferSkill[],
        title: JobOfferTItle,
        vacant: JobOfferVacant,
        likes: JobOfferLike[],
        complaint: JobOfferComplaint[],
        date: JobOfferDate,
        Id: JobOfferId,
        _gigDuration?: GigDuration,
    ){  
        this.description = description,
        this.salary = salary,
        this.skills = skills,
        this.title = title,
        this.vacant = vacant,
        this.likes = likes
        this.complaint = complaint,
        this.date = date,
        this.Id = Id
        this.eventRecorder.push(new JobOfferModified(Id,description,salary,skills,title,vacant,likes,complaint,date, OfferStatus.notPublished))
    }

    protected invariants() {}
}
import IDomainEvent from "../../../shared/domain/IDomainEvent";
import JobOfferAceptedandRejectedComplaint from "../domain-events/JobOfferComplaint/JobOfferAceptedandRemoveComplaint";
import JobOfferComplaintCreated from "../domain-events/JobOfferComplaint/JobOfferComplaintCreated";
import JobOfferAceptedComplaintIdException from "../exceptions/JobOfferComplaint/JobOfferAceptedException";
import JobOfferRejectedComplaintIdException from "../exceptions/JobOfferComplaint/JobOfferRejectedComplaint";
import JobOfferComplaintId from "../value-objects/JobOfferComplaint/JobOfferComplaitId";
import JobOfferComplaintDate from "../value-objects/JobOfferComplaint/JobOfferDateComplaint";
import JobOfferComplaintIssue from "../value-objects/JobOfferComplaint/JobOfferIssueComplaint";

export class JobOfferComplaint{

	private eventRecorder: IDomainEvent[] = [];

	constructor(private id: JobOfferComplaintId,
    			private issue: JobOfferComplaintIssue,
                private dateComplaint: JobOfferComplaintDate,
                private acceptedOrRejected: boolean | null){};

	public getEvents(){
		return this.eventRecorder;
	}

	public addEvent(domainEvent: JobOfferComplaint){
		this.eventRecorder.push(domainEvent);
	}

    public setAcceptedOrRejected(_acceptedOrRejected: boolean){
        this.acceptedOrRejected = _acceptedOrRejected;
    }

    public getAcceptedOrRejected(){
        return this.acceptedOrRejected
    }

    public getissue(){
        return this.issue
    }

    public getdateComplaint(){
        return this.dateComplaint
    }

    public getId(){
		return this.id;
	}
    
    static create( 
        id: JobOfferComplaintId,
    	issue: JobOfferComplaintIssue,
        dateComplaint: JobOfferComplaintDate,
    ){
        const offer = new JobOfferComplaint(id, issue,dateComplaint,null);
        offer.eventRecorder.push(new JobOfferComplaintCreated(id, issue,dateComplaint,null));
        return offer;
    }

	static acceptedComplaint(id: JobOfferComplaintId, object: JobOfferComplaint[]){
        for(let x=0; x<=object.length-1; x++){
			const compare = object[x].getId();
            
			if(id.getId() === compare.getId()){
				object[x].setAcceptedOrRejected(true)
				object[x].eventRecorder.push(new JobOfferAceptedandRejectedComplaint(object[x].id,true))
				return object[x];
			}
		}
		throw new JobOfferAceptedComplaintIdException(
			'Ya fue aceptada la denuncia'
		);
	}

	static rejectedComplaint(id: JobOfferComplaintId, object: JobOfferComplaint[]){
        for(let x=0; x<=object.length-1; x++){
			const compare = object[x].getId();
            
			if(id.getId() === compare.getId()){
				object[x].setAcceptedOrRejected(false)
				object[x].eventRecorder.push(new JobOfferAceptedandRejectedComplaint(object[x].id, false))
				return object[x];
			}
		}
		throw new JobOfferRejectedComplaintIdException(
			'Ya fue Rechazada la denuncia'
		);
    }
}

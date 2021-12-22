import IDomainEvent from "../../../shared/domain/IDomainEvent";
import UniqueId from "../../../shared/domain/UniqueUUID";
import jobofferlike_event from "../domain-events/jobOfferLike/JobOfferLike.Event";
import JobOfferLikedId from "../value-objects/jobOfferLike/JobOfferLikeId";

export class JobOfferLike{

	private eventRecorder: IDomainEvent[] = [];

	constructor(public id: JobOfferLikedId,
    			private value: boolean){};

	public getEvents(){
		return this.eventRecorder;
	}

	public addEvent(domainEvent: JobOfferLikedId){
		this.eventRecorder.push(domainEvent);
	}

	static likeOffer(){
		const id = JobOfferLikedId.create(new UniqueId().getId());
		const like = new JobOfferLike(id, true);
		like.eventRecorder.push(new jobofferlike_event(id, true))
		return like;
	}
	
}


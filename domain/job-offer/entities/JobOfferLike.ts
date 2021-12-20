import IDomainEvent from "../../../shared/domain/IDomainEvent";
import LikeAdded_book from "../domain-events/LikeAdded_book";
import JobOfferLikedId from "../value-objects/JobOfferLikeId";

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

	static likeOffer(id: JobOfferLikedId){
		const like = new JobOfferLike(id, true);
		like.eventRecorder.push(new LikeAdded_book(id, true))
		return like;
	}
	
}


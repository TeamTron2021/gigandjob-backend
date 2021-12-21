import IDomainEvent from "../../../shared/domain/IDomainEvent";
import UniqueId from "../../../shared/domain/UniqueUUID";
import jobofferlike_event from "../domain-events/jobOfferLike/JobOfferLike.Event";
import JobOfferWithoutLikeException from "../exceptions/JobOffer/JobOfferWithoutLikeException";
import JobOfferLikedId from "../value-objects/jobOfferLike/JobOfferLikeId";

export class JobOfferLike{

	private eventRecorder: IDomainEvent[] = [];

	constructor(public id: JobOfferLikedId,
    			private value: boolean){};

	public getEvents(){
		return this.eventRecorder;
	}

	
    public setValue(_value: boolean){
        this.value = _value;
    }

    public getValue(){
        return this.value
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

	/*static removelike(id: JobOfferLikedId, object: JobOfferLike){
		const removelike = new JobOfferLike(id, true);
		removelike.eventRecorder.push(new jobofferlike_event(id, true))
		return removelike;
	}
	*/
	static removelike(object: JobOfferLike[]){
		for(let x=0; x<=object.length-1; x++){
			const compare = object[x].getValue();
			const compare2:  boolean = true;
			if(compare === compare2){
				object[x].setValue(false)
				object[x].eventRecorder.push(new jobofferlike_event(object[x].id, object[x].value))
				return object[x];
			}
		}
		throw new JobOfferWithoutLikeException(
			'No hay likes a remover'
		);
	}
}



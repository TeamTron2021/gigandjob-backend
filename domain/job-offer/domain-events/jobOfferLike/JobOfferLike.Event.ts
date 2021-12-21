import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import JobOfferLikedId from "../../value-objects/jobOfferLike/JobOfferLikeId";


export default class jobofferlike_event implements IDomainEvent{

    constructor(
        public id: JobOfferLikedId,
        public value: boolean
    ){}

    public setValue(_value: boolean){
        this.value = _value;
    }

    public getValue(){
        return this.value
    }

}
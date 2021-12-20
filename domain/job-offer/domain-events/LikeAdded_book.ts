import IDomainEvent from "../../../shared/domain/IDomainEvent";
import JobOfferLikedId from "../value-objects/JobOfferLikeId";


export default class LikeAdded_book implements IDomainEvent{

    constructor(public id: JobOfferLikedId,
        public value: boolean){}

}
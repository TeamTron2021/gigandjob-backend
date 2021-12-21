import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import JobOfferLikedId from "../../value-objects/jobOfferLike/JobOfferLikeId";


export default class jobofferlike_event implements IDomainEvent{

    constructor(
        public id: JobOfferLikedId,
        public value: boolean
    ){}

}
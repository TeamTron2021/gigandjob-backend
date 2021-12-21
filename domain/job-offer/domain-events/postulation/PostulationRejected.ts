import  IDomainEvent  from "../../../../shared/domain/IDomainEvent";
import { PostulationUUID } from "../../value-objects/postulation/PostulationUUID";

export default class PostulationRejected implements IDomainEvent {
    constructor(public id: PostulationUUID) {}
}
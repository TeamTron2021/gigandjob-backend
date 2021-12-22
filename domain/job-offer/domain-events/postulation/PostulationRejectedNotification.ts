import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import PostulationNotificationContent from "../../value-objects/postulation/PostulationRejectedNotificationContent";
import PostulationNotificationSubject from "../../value-objects/postulation/PostulationRejectedNotificationSubject";
import { PostulationUUID } from "../../value-objects/postulation/PostulationUUID";

export default class PostulationRejectedNotification implements IDomainEvent {
    constructor(public id: PostulationUUID, 
                public subject:PostulationNotificationSubject, 
                public content: PostulationNotificationContent){}
}
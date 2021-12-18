import { PostulationUUID } from "../value-objects/PostulationUUID";
import { PostulationDate } from "../value-objects/PostulationDate";
import { PostulationStatus } from "../value-objects/PostulationStatus";

export class PostulationUpdatedStatus {
    
    constructor (
        public id: PostulationUUID,
        public date: PostulationDate,
        public status: PostulationStatus
    ) {

    }

}
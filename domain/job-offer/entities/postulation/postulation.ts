import { PostulationDate } from "./value-objects/PostulationDate";
import { PostulationStatus } from "./value-objects/PostulationStatus";
import { PostulationUUID } from "./value-objects/PostulationUUID";
import { v4 as uuidv4 } from "uuid";
import { PostulationCreated } from "./domain-events/PostulationCreated";
import { PostulationUpdatedStatus } from "./domain-events/PostulationUpdatedStatus";

type postulationEvents = PostulationCreated | PostulationUpdatedStatus;

export class Postulation<S extends PostulationStatus> {

    public status: S
    private readonly ID: PostulationUUID
    //private readonly interviewID: string;
    private eventHandle: postulationEvents[] = []

    constructor (
        private date: PostulationDate, 
        status: S
    ) {
        this.ID = new PostulationUUID(uuidv4())
        this.status = status
        // this.interviewID = interview.getID()
    }

    getId(): PostulationUUID { return this.ID}
    getDate(): PostulationDate { return this.date } 
    getEvents(): postulationEvents[] { return this.eventHandle }

    static create(
        date: PostulationDate,
    ): Postulation<PostulationStatus.isSend> {
         //se crea la postulacion del usuario
        const postulation = new Postulation(date, PostulationStatus.isSend)

        postulation.eventHandle.push(new PostulationCreated(
            postulation.getId(),
            postulation.getDate(),
            postulation.status
        ))

        return postulation
    }

    public postulationUpdateStatus (
        date: PostulationDate,
        status: PostulationStatus
    ): Postulation<PostulationStatus> {
        const postulation = new Postulation(date, status)

        postulation.eventHandle.push(new PostulationUpdatedStatus (
            postulation.getId(),
            postulation.getDate(),
            postulation.status
        ))

        return postulation
    }

}
import { PostulationDate } from "./value-objects/postulationDate";
import { PostulationStatus } from "./value-objects/PostulationStatus";
import { PostulationUUID } from "./value-objects/PostulationUUID";
import { v4 as uuidv4 } from "uuid";
import { PostulationCreated } from "./domain-events/PostulationCreated";
import { PostulationUpdatedStatus } from "./domain-events/PostulationUpdatedStatus";
import Interview from "../../../interview/entities/Interview";
import { InterviewStatus } from "../../../interview/shared/InterviewStatus.enum";

type postulationEvents = PostulationCreated | PostulationUpdatedStatus;

export class Postulation<S extends PostulationStatus> {

    public status: S
    private readonly ID: PostulationUUID
    private eventHandle: postulationEvents[] = []
    private interviews?: Interview<InterviewStatus>[] = []

    constructor (
        private date: PostulationDate, 
        status: S,
        interviews?: Interview<InterviewStatus>[] 
    ) {
        this.ID = new PostulationUUID(uuidv4())
        this.status = status
        this.interviews = interviews
    }

    getId(): PostulationUUID { return this.ID}
    getDate(): PostulationDate { return this.date } 
    getEvents(): postulationEvents[] { return this.eventHandle }
    getInterviews(): Interview<InterviewStatus>[] | any { return this.interviews }

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

import { v4 as uuidv4 } from "uuid";
import IDomainEvent from "../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import { PostulationCreated } from "../domain-events/postulation/PostulationCreated";
import PostulationRejected from "../domain-events/postulation/PostulationRejected";
import PostulationRejectedNotification from "../domain-events/postulation/PostulationRejectedNotification";
import { PostulationUpdatedStatus } from "../domain-events/postulation/PostulationUpdatedStatus";
import { PostulationDate } from "../value-objects/postulation/PostulationDate";
import { PostulationStatus } from "../value-objects/postulation/PostulationStatus";
import { PostulationUUID } from "../value-objects/postulation/PostulationUUID";
import PostulationNotificationSubject from "../value-objects/postulation/PostulationRejectedNotificationSubject";
import PostulationNotificationContent from "../value-objects/postulation/PostulationRejectedNotificationContent";
import Interview from "./Interview";


type postulationEvents = PostulationCreated | PostulationUpdatedStatus | IDomainEvent;

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

    public rejectPostulation() {
        const postulationDate = new PostulationDate(new Date())
        const postulation = this.postulationUpdateStatus(postulationDate, PostulationStatus.reject);
        postulation.eventHandle.push(new PostulationRejected(postulation.ID, postulation.status));
        const subject = new PostulationNotificationSubject('Su postulacion ha sido rechazada'); 
        const content = new PostulationNotificationContent('Lamentablemente no cumple con los requerimientos necesarios para la oferta'); 
        postulation.eventHandle.push(new PostulationRejectedNotification(this.ID, subject, content)); 
        return postulation;
    }

}
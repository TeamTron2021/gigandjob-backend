/* eslint-disable @typescript-eslint/no-empty-function */
import { v4 as uuidv4 } from 'uuid';
import IDomainEvent from '../../../shared/domain/IDomainEvent';
import { InterviewStatus } from '../shared/InterviewStatus.enum';
import { PostulationCreated } from '../domain-events/postulation/PostulationCreated';
import PostulationRejected from '../domain-events/postulation/PostulationRejected';
import PostulationRejectedNotification from '../domain-events/postulation/PostulationRejectedNotification';
import { PostulationUpdatedStatus } from '../domain-events/postulation/PostulationUpdatedStatus';
import { PostulationDate } from '../value-objects/postulation/PostulationDate';
import { PostulationStatus } from '../value-objects/postulation/PostulationStatus';
import { PostulationUUID } from '../value-objects/postulation/PostulationUUID';
import PostulationNotificationSubject from '../value-objects/postulation/PostulationRejectedNotificationSubject';
import PostulationNotificationContent from '../value-objects/postulation/PostulationRejectedNotificationContent';
import Interview from './Interview';
import PostulationAcceptedNotification from '../domain-events/postulation/PostulationAcceptedNotification';
import { IChangeInterviewStatus } from '../domain-service/interview/IChangeInterviewStatus';
import { ChangeInterviewStatusToEnable } from '../domain-service/interview/ChangeInterviewStatusToEnable';

type postulationEvents =
  | PostulationCreated
  | PostulationUpdatedStatus
  | IDomainEvent;

export class Postulation<S extends PostulationStatus> {
  public status: S;
  public readonly ID: PostulationUUID;
  private eventHandle: postulationEvents[] = [];
  private interviews: Interview<InterviewStatus>[] = [];

  constructor(private date: PostulationDate, status: S) {
    this.ID = new PostulationUUID(uuidv4());
    this.status = status;
  }

  getId(): PostulationUUID {
    return this.ID;
  }
  getDate(): PostulationDate {
    return this.date;
  }
  getEvents(): postulationEvents[] {
    return this.eventHandle;
  }
  getInterviews(): Interview<InterviewStatus>[] {
    return this.interviews;
  }

  addInterviews(interview: Interview<InterviewStatus>): void {
    this.interviews.push(interview);
  }

 public static create(date: PostulationDate): Postulation<PostulationStatus.isSend> {
    //se crea la postulacion del usuario
    const postulation = new Postulation(date, PostulationStatus.isSend);

    postulation.eventHandle.push(
      new PostulationCreated(
        postulation.getId(),
        postulation.getDate(),
        postulation.status,
      ),
    );

    return postulation;
  }

  public postulationUpdateStatus(
    date: PostulationDate,
    status: PostulationStatus,
  ): Postulation<PostulationStatus> {
    const postulation = new Postulation(date, status);

    postulation.eventHandle.push(
      new PostulationUpdatedStatus(
        postulation.getId(),
        postulation.getDate(),
        postulation.status,
      ),
    );

    return postulation;
  }

  public acceptPostulation() {
    const postulationDate = new PostulationDate(new Date());
    const postulation = this.postulationUpdateStatus(
      postulationDate,
      PostulationStatus.passed,
    );
    postulation.eventHandle.push(
      new PostulationRejected(postulation.ID, postulation.status),
    );
    const subject = new PostulationNotificationSubject(
      'Su postulacion ha sido aceptada',
    );
    const content = new PostulationNotificationContent(
      'Felicidades, su postulación ha sido aprobada, en los siguientes días será contactado para su entrevista',
    );
    postulation.eventHandle.push(
      new PostulationAcceptedNotification(this.ID, subject, content),
    );
    return postulation;
  }

  public rejectPostulation() {
    const postulationDate = new PostulationDate(new Date());
    const postulation = this.postulationUpdateStatus(
      postulationDate,
      PostulationStatus.reject,
    );
    postulation.eventHandle.push(
      new PostulationRejected(postulation.ID, postulation.status),
    );
    const subject = new PostulationNotificationSubject(
      'Su postulacion ha sido rechazada',
    );
    const content = new PostulationNotificationContent(
      'Lamentablemente no cumple con los requerimientos necesarios para la oferta',
    );
    postulation.eventHandle.push(
      new PostulationRejectedNotification(this.ID, subject, content),
    );
    return postulation;
  }

  public suspendInterview() {}

  public reactivateInterviewsUser(): void {
    const interviewReactivate: IChangeInterviewStatus =
      new ChangeInterviewStatusToEnable();

    this.interviews.forEach((interv) => {
      interv.status = interviewReactivate.changeStatus(
        InterviewStatus.disabled,
      );
    });
  }

  protected invariants() {}
}

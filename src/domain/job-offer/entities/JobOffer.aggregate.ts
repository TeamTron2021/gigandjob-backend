import IDomainEvent from '../../../shared/domain/IDomainEvent';
import JobOfferCreated from '../domain-events/job-offer/JobOfferCreated.Event';
import JobOfferModified from '../domain-events/job-offer/JobOfferModified.Event';
import JobOfferRemovedEvent from '../domain-events/job-offer/JobOfferRemove.Event';
import JobOfferPublished from '../domain-events/job-offer/Notification/JobOfferPublished.Event';
import JobOfferSuspended from '../domain-events/job-offer/Notification/JobOfferSuspended.Event';
import IJobOffer from '../shared/IJobOffer';
import { OfferStatus } from '../shared/OfferStatus.enum';
import GigDuration from '../value-objects/Gig/JobOfferGigDuration';
import JobOfferDate from '../value-objects/JobOffer/JobOfferDate';
import JobOfferDescription from '../value-objects/JobOffer/JobOfferDescription';
import JobOfferId from '../value-objects/JobOffer/JobOfferId';
import { JobOfferNotificationContent } from '../value-objects/JobOffer/JobOfferNotificationContent';
import { JobOfferNotificationSubject } from '../value-objects/JobOffer/JobOfferNotificationSubject';
import JobOfferSalary from '../value-objects/JobOffer/JobOfferSalary';
import JobOfferSkill from '../value-objects/JobOffer/JobOfferSkill';
import JobOfferTItle from '../value-objects/JobOffer/JobOfferTitle';
import JobOfferVacant from '../value-objects/JobOffer/JobOfferVacant';
import { PostulationStatus } from '../value-objects/postulation/PostulationStatus';
import { JobOfferComplaint } from './JobOfferComplaint';
import { JobOfferLike } from './JobOfferLike';
import JobOfferNotification from './JobOfferNotification';
import { Postulation } from './postulation';
import InterviewTitle from '../value-objects/Interview/interview/InterviewTitle';
import InterviewDescription from '../value-objects/Interview/interview/InterviewDescription';
import InterviewDate from '../value-objects/Interview/interview/InterviewDate';
import InterviewId from '../value-objects/Interview/interview/InterviewId';
import OnlineInterviewUrlMeeting from '../value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting';
import { InterviewStatus } from '../shared/InterviewStatus.enum';
import OnlineInterview from './OnlineInterview';
import InterviewAccepted from '../domain-events/interview/interview/InterviewAccepted.Event';
import InPersonInterviewDirection from '../value-objects/Interview/InPersonInterview/InPersonInterviewDirection';
import InPersonInterview from './InPersonInterview';
import { InterviewRejected } from '../domain-events/interview/interview/InterviewRejected.Event';
import InterviewAcceptedNotification from './InterviewAcceptedNotification';
import { InterviewNotificationSubject } from '../value-objects/Interview/InterviewNotificationSubject';
import { InterviewNotificationContent } from '../value-objects/Interview/InterviewNotificationContent';
import Interview from "./Interview";

export default class JobOffer<S extends OfferStatus> implements IJobOffer {
  private eventRecorder: IDomainEvent[] = [];
  private postulations: Postulation<PostulationStatus>[] = [];
  public status: S;
  constructor(
    public description: JobOfferDescription,
    public salary: JobOfferSalary,
    public skills: JobOfferSkill[],
    public title: JobOfferTItle,
    public vacant: JobOfferVacant,
    public likes: JobOfferLike[],
    public complaint: JobOfferComplaint[],
    public date: JobOfferDate,
    status: S,
    private Id: JobOfferId,
  ) {
    this.status = status;
  }
  public getPostulations(): Postulation<PostulationStatus>[] {
    return this.postulations;
  }

  public addPostulation(postulation: Postulation<PostulationStatus>): void {
    this.postulations.push(postulation);
  }
  public getOfferId() {
    return this.Id;
  }
  public getEvents() {
    return this.eventRecorder;
  }
  public addEvent(domainEvent: IDomainEvent) {
    this.eventRecorder.push(domainEvent);
  }

  static create(
    description: JobOfferDescription,
    salary: JobOfferSalary,
    skills: JobOfferSkill[],
    title: JobOfferTItle,
    vacant: JobOfferVacant,
    likes: JobOfferLike[],
    complaint: JobOfferComplaint[],
    date: JobOfferDate,
    Id: JobOfferId,
    _gigDuration?: GigDuration,
  ) {
    const offer = new JobOffer(
      description,
      salary,
      skills,
      title,
      vacant,
      likes,
      complaint,
      date,
      OfferStatus.notPublished,
      Id,
    );
    offer.eventRecorder.push(
      new JobOfferCreated(
        Id,
        description,
        salary,
        skills,
        title,
        vacant,
        likes,
        complaint,
        date,
        OfferStatus.notPublished,
      ),
    );
    return offer;
  }
  modified(
    description: JobOfferDescription,
    salary: JobOfferSalary,
    skills: JobOfferSkill[],
    title: JobOfferTItle,
    vacant: JobOfferVacant,
    likes: JobOfferLike[],
    complaint: JobOfferComplaint[],
    date: JobOfferDate,
    Id: JobOfferId,
    _gigDuration?: GigDuration,
  ) {
    (this.description = description),
      (this.salary = salary),
      (this.skills = skills),
      (this.title = title),
      (this.vacant = vacant),
      (this.likes = likes);
    (this.complaint = complaint), (this.date = date), (this.Id = Id);
    this.eventRecorder.push(
      new JobOfferModified(
        Id,
        description,
        salary,
        skills,
        title,
        vacant,
        likes,
        complaint,
        date,
        OfferStatus.notPublished,
      ),
    );
  }

  public isSuspended(
    this: JobOffer<OfferStatus.published>,
  ): JobOffer<OfferStatus.suspended> {
    const OfferSuspended = new JobOffer(
      this.description,
      this.salary,
      this.skills,
      this.title,
      this.vacant,
      this.likes,
      this.complaint,
      this.date,
      OfferStatus.suspended,
      this.Id,
    );
    OfferSuspended.eventRecorder = this.eventRecorder.slice(0);
    this.eventRecorder.push(
      new JobOfferSuspended(this.Id, OfferStatus.suspended),
    );
    const subject = new JobOfferNotificationSubject(
      'La Oferta de trabajo ha sido suspendida',
    );
    const content = new JobOfferNotificationContent(
      'Se deben realizar los siguientes pasos',
    );
    const JobOfferSuspendedNotification = new JobOfferNotification(
      subject,
      content,
      OfferSuspended,
    );
    JobOfferSuspendedNotification.sendSuspensionOffer();
    return OfferSuspended;
  }

  public isPublished(
    this: JobOffer<OfferStatus.notPublished>,
  ): JobOffer<OfferStatus.published> {
    const OfferPublished = new JobOffer(
      this.description,
      this.salary,
      this.skills,
      this.title,
      this.vacant,
      this.likes,
      this.complaint,
      this.date,
      OfferStatus.published,
      this.Id,
    );
    this.eventRecorder.push(
      new JobOfferPublished(this.Id, OfferStatus.published),
    );
    const subject = new JobOfferNotificationSubject(
      'La Oferta de trabajo ha sido Publicada',
    );
    const content = new JobOfferNotificationContent('Ahora solo queda esperar');
    const JobOfferSuspendedNotification = new JobOfferNotification(
      subject,
      content,
      OfferPublished,
    );
    JobOfferSuspendedNotification.sendPublishedOffer();
    return OfferPublished;
  }

  public JobOfferRevoked(
    this: JobOffer<OfferStatus.notPublished | OfferStatus.published>,
  ): JobOffer<OfferStatus.disable> {
    const OfferRevoked = new JobOffer(
      this.description,
      this.salary,
      this.skills,
      this.title,
      this.vacant,
      this.likes,
      this.complaint,
      this.date,
      OfferStatus.disable,
      this.Id,
    );
    OfferRevoked.eventRecorder = this.eventRecorder.slice(0);
    this.eventRecorder.push(
      new JobOfferPublished(this.Id, OfferStatus.disable),
    );
    const subject = new JobOfferNotificationSubject('Oferta Revocada');
    const content = new JobOfferNotificationContent(
      'Su oferta ha sido desahbilitada debido a suspensión',
    );
    const JobOfferRevokedNotification = new JobOfferNotification(
      subject,
      content,
      OfferRevoked,
    );
    JobOfferRevokedNotification.sendPublishedOffer();
    return OfferRevoked;
  }

  protected createAndSendInterviewAcceptedNotification(
    interview: InterviewId,
  ): void {
    const interviewAcceptedNotification: InterviewAcceptedNotification =
      InterviewAcceptedNotification.create(
        new InterviewNotificationSubject('Entrevista aceptada'),
        new InterviewNotificationContent(
          'El usuario ha aceptado la entrevista agendada',
        ),
        interview,
      );
    interviewAcceptedNotification.sendNotification();
  }

  /**
   * Actualiza el estado de una entrevista a "accepted", generando un evento de dominio si el cambio fue
   * exitoso.
   *
   * @param interviewId Identificador de la entrevista.
   * @param interviewStatus Estado actual de la entrevista.
   *
   * @throws InterviewCurrentlyDisabledException
   * */
  public acceptInterview(
    interviewId: InterviewId,
    interviewStatus: InterviewStatus,
  ): void {
    try {
      const interview = new Interview(
        interviewId,
        interviewStatus,
      );

      interview.acceptInterview(); // Cambiar el estado de la entrevista.

      // Generación del evento de dominio.
      const interviewAcceptedEvent: IDomainEvent = new InterviewAccepted(
        interview.getInterviewId(),
        interview.getStatus(),
      );
      this.eventRecorder.push(interviewAcceptedEvent);

      // Creación de notificación de entrevista aceptada.
      this.createAndSendInterviewAcceptedNotification(
        interview.getInterviewId(),
      );
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  /**
   * Actualiza el estado de una entrevista presencial a "accepted", generando un evento de dominio si el cambio fue
   * exitoso.
   *
   * @param interviewTitle Título de la entrevista.
   * @param interviewDescription Descripción de la entrevista.
   * @param interviewDate Fechas de inicio y finalización de la entrevista.

   * @param interviewStatus Estado actual de la entrevista.
   * @param interviewId Identificador de la entrevista.
   * @param interviewDirection Lugar en donde se realizará la entrevista.
   * */
  public acceptInPersonInterview(
    interviewTitle: InterviewTitle,
    interviewDescription: InterviewDescription,
    interviewDate: InterviewDate,
    interviewStatus: InterviewStatus,
    interviewId: InterviewId,
    interviewDirection: InPersonInterviewDirection,
  ): void {
    try {
      const interview = new InPersonInterview(
        interviewTitle,
        interviewDescription,
        interviewDate,
        interviewStatus,
        interviewId,
        interviewDirection,
      );

      interview.acceptInterview(); // Cambiar el estado de la entrevista.

      // Generación del evento de dominio.
      const interviewAcceptedEvent: IDomainEvent = new InterviewAccepted(
        interview.getInterviewId(),
        interview.getStatus(),
      );
      this.eventRecorder.push(interviewAcceptedEvent);

      // Creación de notificación de entrevista aceptada.
      this.createAndSendInterviewAcceptedNotification(
        interview.getInterviewId(),
      );
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  /**
   * Actualiza el estado de una entrevista presencial a "accepted", generando un evento de dominio si el cambio fue
   * exitoso.
   *
   * @param interviewTitle Título de la entrevista.
   * @param interviewDescription Descripción de la entrevista.
   * @param interviewDate Fechas de inicio y finalización de la entrevista.
   * @param interviewStatus Estado actual de la entrevista.
   * @param interviewId Identificador de la entrevista.
   * @param interviewUrlMeeting URL de la entrevista virtual.
   * */
  public acceptOnlineInterview(
    interviewTitle: InterviewTitle,
    interviewDescription: InterviewDescription,
    interviewDate: InterviewDate,
    interviewStatus: InterviewStatus,
    interviewId: InterviewId,
    interviewUrlMeeting: OnlineInterviewUrlMeeting,
  ): void {
    try {
      const interview = new OnlineInterview(
        interviewTitle,
        interviewDescription,
        interviewDate,
        interviewStatus,
        interviewId,
        interviewUrlMeeting,
      );

      interview.acceptInterview(); // Cambiar el estado de la entrevista.

      // Generación del evento de dominio.
      const interviewAcceptedEvent: IDomainEvent = new InterviewAccepted(
        interview.getInterviewId(),
        interview.getStatus(),
      );
      this.eventRecorder.push(interviewAcceptedEvent);

      // Creación de notificación de entrevista aceptada.
      this.createAndSendInterviewAcceptedNotification(
        interview.getInterviewId(),
      );
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  public rejectInPersonInterview(
    interviewTitle: InterviewTitle,
    interviewDescription: InterviewDescription,
    interviewDate: InterviewDate,
    interviewStatus: InterviewStatus,
    interviewId: InterviewId,
    interviewDirection: InPersonInterviewDirection,
  ): void {
    try {
      const interview = new InPersonInterview(
        interviewTitle,
        interviewDescription,
        interviewDate,
        interviewStatus,
        interviewId,
        interviewDirection,
      );
      interview.rejectInterview();
      const interviewEventReject: IDomainEvent = new InterviewRejected(
        interview.getInterviewId(),
        interview.getStatus(),
      );
      this.eventRecorder.push(interviewEventReject);
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  public RejectOnlineInterview(
    interviewTitle: InterviewTitle,
    interviewDescription: InterviewDescription,
    interviewDate: InterviewDate,
    interviewStatus: InterviewStatus,
    interviewId: InterviewId,
    interviewUrlMeeting: OnlineInterviewUrlMeeting,
  ): void {
    try {
      const interview = new OnlineInterview(
        interviewTitle,
        interviewDescription,
        interviewDate,
        interviewStatus,
        interviewId,
        interviewUrlMeeting,
      );
      interview.rejectInterview();
      const interviewEventReject: IDomainEvent = new InterviewRejected(
        interview.getInterviewId(),
        interview.getStatus(),
      );
      this.eventRecorder.push(interviewEventReject);
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  static JobOfferRemove(id: JobOfferId, object: JobOffer<OfferStatus>[]) {
    for (let x = 0; x <= object.length - 1; x++) {
      const compare = object[x].getOfferId();
      if (id.getId() === compare.getId()) {
        object[x].eventRecorder.push(
          new JobOfferRemovedEvent(
            object[x].Id,
            object[x].description,
            object[x].salary,
            object[x].skills,
            object[x].title,
            object[x].vacant,
            object[x].likes,
            object[x].complaint,
            object[x].date,
            object[x].status,
          ),
        );
        object[x].eventRecorder.push(
          new JobOfferPublished(id, OfferStatus.Removed),
        );
        const subject = new JobOfferNotificationSubject(
          'La Oferta de trabajo ha sido Removida',
        );
        const content = new JobOfferNotificationContent(
          'Escoja entre el resto de las opciones',
        );
        const JobOfferSuspendedNotification = new JobOfferNotification(
          subject,
          content,
          object[x],
        );
        JobOfferSuspendedNotification.sendRemoveOffer();
        object.splice(x, 1);
        return object;
      }
    }
  }

  public ReactivatedOffer(
    this: JobOffer<OfferStatus.suspended>,
  ): JobOffer<OfferStatus.published> {
    const reactivatedOffer = new JobOffer(
      this.description,
      this.salary,
      this.skills,
      this.title,
      this.vacant,
      this.likes,
      this.complaint,
      this.date,
      OfferStatus.published,
      this.Id,
    );
    reactivatedOffer.eventRecorder = this.eventRecorder.slice(0);
    this.eventRecorder.push(
      new JobOfferPublished(this.Id, OfferStatus.published),
    );
    const subject = new JobOfferNotificationSubject(
      'La Oferta de trabajo se ha reactivado',
    );
    const content = new JobOfferNotificationContent(
      'Esta disponible entre las opciones',
    );
    const JobOfferReavtivatedNotification = new JobOfferNotification(
      subject,
      content,
      reactivatedOffer,
    );
    JobOfferReavtivatedNotification.sendReactivatedOffer();
    return reactivatedOffer;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected invariants() {}
}

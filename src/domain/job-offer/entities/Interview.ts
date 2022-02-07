import IDomainEvent from '../../../shared/domain/IDomainEvent';
import { InterviewStatus } from '../shared/InterviewStatus.enum';
import InterviewCreated from '../domain-events/interview/interview/interviewCreated/InterviewCreated.Event';
import IInterview from '../shared/IInterview';
import InterviewTitle from '../value-objects/Interview/interview/InterviewTitle';
import InterviewDescription from '../value-objects/Interview/interview/InterviewDescription';
import InterviewDate from '../value-objects/Interview/interview/InterviewDate';
import InterviewId from '../value-objects/Interview/interview/InterviewId';
import NotificationSubject from '../value-objects/Interview/interview/interview-notification/NotificationSubject';
import NotificationContent from '../value-objects/Interview/interview/interview-notification/NotificationContent';
import InterviewNotification from './InterviewNotification';
import InterviewRegistered from '../domain-events/interview/interview/notifications/InterviewRegistered.Event';
import InterviewRechedule from '../domain-events/interview/interview/interviewReschedule/InterviewRechedule.Event';
import { InterviewDataUpdated } from '../domain-events/interview/InterviewDataUpdated.Event';
import ChangeInterviewStatusToRescheduled from '../domain-service/interview/ChangeInterviewStatusToRescheduled';
import { IChangeInterviewStatus } from '../domain-service/interview/IChangeInterviewStatus';
import { ChangeInterviewStatusToRejected } from '../domain-service/interview/ChangeInterviewStatusToRejected';
import { InterviewRejected } from '../domain-events/interview/interview/InterviewRejected.Event';
import ChangeInterviewStatusToAccepted from '../domain-service/interview/ChangeInterviewStatusToAccepted';
import disabledInterviewE from '../domain-events/interview/interview/disabledInterview/disabledInterview.Event';
import { ChangeInterviewStatusToDisable } from '../domain-service/interview/ChangeInterviewStatusToDisable';

export default class Interview<S extends InterviewStatus>
  implements IInterview
{
  private eventRecorder: IDomainEvent[] = [];
  public status: S;
  constructor(
    public title: InterviewTitle,
    public description: InterviewDescription,
    public date: InterviewDate,
    status: S,
    public Id: InterviewId,
  ) {
    this.status = status;
  }

  public getInterviewId() {
    return this.Id;
  }
  
  

  public getEvents() {
    return this.eventRecorder;
  }
  public addEvent(domainEvent: IDomainEvent) {
    this.eventRecorder.push(domainEvent);
  }

  static create(
    title: InterviewTitle,
    description: InterviewDescription,
    date: InterviewDate,
    Id: InterviewId,
  ) {
    const interview = new Interview(
      title,
      description,
      date,
      InterviewStatus.created,
      Id,
    );

    interview.eventRecorder.push(
      new InterviewCreated(
        title,
        description,
        date,
        InterviewStatus.created,
        Id,
      ),
    );

    const subject = new NotificationSubject(
      'Ha agendado correctamente la Entrevista',
    );
    const content = new NotificationContent(
      'Ahora tienes que seguir los siguientes pasos',
    );
    const interviewNotification = InterviewNotification.register(
      subject,
      content,
      interview,
    );

    interview.eventRecorder.push(new InterviewRegistered(subject, content));
    return interview;
  }

  public rescheduledInterview(
    this: Interview<S>,
  ): Interview<InterviewStatus.rescheduled> {
    const interviewStatusChanger: IChangeInterviewStatus =
      new ChangeInterviewStatusToRescheduled();
    const interviewNewStatus = interviewStatusChanger.changeStatus(this.status);

    const interview = new Interview(
      this.title,
      this.description,
      this.date,
      interviewNewStatus,
      this.Id,
    );
    interview.eventRecorder = this.eventRecorder.slice(0);

    interview.eventRecorder.push(
      new InterviewRechedule(this.Id, this.date, interviewNewStatus),
    );
    const subject = new NotificationSubject(
      'La Entrevista ha sido reprogramada',
    );
    const content = new NotificationContent(
      'Ahora tienes que seguir los siguientes pasos',
    );
    const interviewNotification = new InterviewNotification(
      subject,
      content,
      interview,
    );
    interviewNotification.sendRescheduled();
    return interview;
  }

  updateData(Description: InterviewDescription, Title: InterviewTitle) {
    this.description = Description;
    this.title = Title;
    this.eventRecorder.push(
      new InterviewDataUpdated(this.description, this.title),
    );
  }

  /**
   * Cambia el estado de la entrevista a "accepted", siempre y cuando no esté actualmente en "disabled".
   *
   * @throws InterviewCurrentlyDisabledException
   * */
  public acceptInterview(): void {
    try {
      const interviewStatusChanger: IChangeInterviewStatus =
        new ChangeInterviewStatusToAccepted();
      this.status = interviewStatusChanger.changeStatus(this.status);
    } catch (e) {
      // console.log(e);
      throw e;
    }
  }

  public rejectInterview(): void {
    try {
      const interviewStatus: IChangeInterviewStatus =
        new ChangeInterviewStatusToRejected();
      this.status = interviewStatus.changeStatus(this.status);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public disableInterview(): void {
    try {
      const interviewStatus: IChangeInterviewStatus =
        new ChangeInterviewStatusToDisable();
      this.status = interviewStatus.changeStatus(this.status);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

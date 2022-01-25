import IDomainEvent from '../../../shared/domain/IDomainEvent';
import { InterviewStatus } from '../shared/InterviewStatus.enum';
import IInterview from '../shared/IInterview';
import OnlineInterviewCreated from '../domain-events/interview/online-interview/OnlineInterviewCreated.Event';
import InterviewTitle from '../value-objects/Interview/interview/InterviewTitle';
import InterviewDescription from '../value-objects/Interview/interview/InterviewDescription';
import InterviewDate from '../value-objects/Interview/interview/InterviewDate';
import InterviewId from '../value-objects/Interview/interview/InterviewId';
import OnlineInterviewUrlMeeting from '../value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting';
import InterviewJobOffer from '../value-objects/Interview/interview/InterviewJobOffer';
import InterviewInterviewed from '../value-objects/Interview/interview/InterviewInterviewed';
import { IChangeInterviewStatus } from '../domain-service/interview/IChangeInterviewStatus';
import ChangeInterviewStatusToRescheduled from '../domain-service/interview/ChangeInterviewStatusToRescheduled';
import OnlineInterviewRechedule from '../domain-events/interview/online-interview/OnlineInterviewReschedule/OnlineInterviewRechedule.Event';
import NotificationSubject from '../value-objects/Interview/interview/interview-notification/NotificationSubject';
import NotificationContent from '../value-objects/Interview/interview/interview-notification/NotificationContent';
import InterviewNotification from './InterviewNotification';
import { InterviewDataUpdated } from '../domain-events/interview/InterviewDataUpdated.Event';
import ChangeInterviewStatusToAccepted from '../domain-service/interview/ChangeInterviewStatusToAccepted';
import { ChangeInterviewStatusToRejected } from '../domain-service/interview/ChangeInterviewStatusToRejected';

export default class OnlineInterview<S extends InterviewStatus>
  implements IInterview
{
  private eventRecorder: IDomainEvent[] = [];
  public status: S;
  constructor(
    public title: InterviewTitle,
    public description: InterviewDescription,
    public date: InterviewDate,
    public interviewed: InterviewInterviewed,
    public jobOffer: InterviewJobOffer,
    status: S,
    public Id: InterviewId,
    public urlMeeting: OnlineInterviewUrlMeeting,
  ) {
    this.status = status;
  }

  public addEvent(domainEvent: IDomainEvent) {
    this.eventRecorder.push(domainEvent);
  }

  public getInterviewId() {
    return this.Id;
  }

  public getStatus() {
    return this.status;
  }

  static create(
    title: InterviewTitle,
    description: InterviewDescription,
    date: InterviewDate,
    interviewed: InterviewInterviewed,
    jobOffer: InterviewJobOffer,
    Id: InterviewId,
    urlMeeting: OnlineInterviewUrlMeeting,
  ) {
    const onlineInterview = new OnlineInterview(
      title,
      description,
      date,
      interviewed,
      jobOffer,
      InterviewStatus.created,
      Id,
      urlMeeting,
    );
    onlineInterview.addEvent(
      new OnlineInterviewCreated(
        Id,
        title,
        description,
        date,
        interviewed,
        jobOffer,
        InterviewStatus.created,
        urlMeeting,
      ),
    );
    return onlineInterview;
  }

  public rescheduledInterview(
    this: OnlineInterview<S>,
  ): OnlineInterview<InterviewStatus.rescheduled> {
    const interview = new OnlineInterview(
      this.title,
      this.description,
      this.date,
      this.interviewed,
      this.jobOffer,
      InterviewStatus.rescheduled,
      this.Id,
      this.urlMeeting,
    );
    interview.eventRecorder = this.eventRecorder.slice(0);

    const interviewStatusChanger: IChangeInterviewStatus =
      new ChangeInterviewStatusToRescheduled();
    const newInterviewStatus: InterviewStatus =
      interviewStatusChanger.changeStatus(this.status);

    interview.eventRecorder.push(
      new OnlineInterviewRechedule(
        this.Id,
        this.date,
        InterviewStatus.rescheduled,
        this.urlMeeting,
      ),
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
      console.log(e);
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
}

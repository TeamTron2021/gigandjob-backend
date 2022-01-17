import IDomainEvent from '../../../../../../shared/domain/IDomainEvent';
import InterviewId from '../../../../value-objects/Interview/interview/InterviewId';
import NotificationSubject from '../../../../value-objects/Interview/interview/interview-notification/NotificationSubject';
import NotificationContent from '../../../../value-objects/Interview/interview/interview-notification/NotificationContent';
import IInterviewNotification from '../../../../shared/IInterviewNotification';
export class InterviewRejectedNotification implements IDomainEvent {
  constructor(
    public id: InterviewId,
    public subject: NotificationSubject,
    public content: NotificationContent,
  ) {}
}

import IDomainEvent from '../../../../../../shared/domain/IDomainEvent';
import NotificationContent from '../../../../value-objects/Interview/interview/interview-notification/NotificationContent';
import NotificationSubject from '../../../../value-objects/Interview/interview/interview-notification/NotificationSubject';
import InterviewId from '../../../../value-objects/Interview/interview/InterviewId';
import { InterviewNotificationContent } from '../../../../value-objects/Interview/InterviewNotificationContent';
import { InterviewNotificationSubject } from '../../../../value-objects/Interview/InterviewNotificationSubject';

export default class InterviewCanceledNotification implements IDomainEvent {
  constructor(
    public id: InterviewId,
    public subject: NotificationSubject,
    public content: NotificationContent,
  ) {}
}

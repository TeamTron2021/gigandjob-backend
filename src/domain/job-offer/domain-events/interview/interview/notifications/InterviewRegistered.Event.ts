import IDomainEvent from '../../../../../../shared/domain/IDomainEvent';
import NotificationContent from '../../../../value-objects/Interview/interview/interview-notification/NotificationContent';
import NotificationSubject from '../../../../value-objects/Interview/interview/interview-notification/NotificationSubject';

export default class InterviewRegistered implements IDomainEvent {
  constructor(
    private readonly subject: NotificationSubject,
    private readonly content: NotificationContent,
  ) {}
}

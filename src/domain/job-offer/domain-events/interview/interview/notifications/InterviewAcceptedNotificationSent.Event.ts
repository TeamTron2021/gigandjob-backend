import IDomainEvent from '../../../../../../shared/domain/IDomainEvent';
import InterviewId from '../../../../value-objects/Interview/interview/InterviewId';
import { InterviewNotificationSubject } from '../../../../value-objects/Interview/InterviewNotificationSubject';
import { InterviewNotificationContent } from '../../../../value-objects/Interview/InterviewNotificationContent';
import InterviewNotificationId from '../../../../value-objects/Interview/interview/InterviewNotificationId';

export default class InterviewAcceptedNotificationSent implements IDomainEvent {
  public constructor(
    private readonly interviewId: InterviewId,
    private readonly subject: InterviewNotificationSubject,
    private readonly content: InterviewNotificationContent,
    private readonly notificationId: InterviewNotificationId,
  ) {}
}

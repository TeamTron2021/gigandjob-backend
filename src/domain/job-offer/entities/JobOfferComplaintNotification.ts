import IDomainEvent from '../../../shared/domain/IDomainEvent';
import JobOfferComplaintMessage from '../value-objects/JobOfferComplaint/JobOfferComplaintMessage';
import JobOfferComplaintIssue from '../value-objects/JobOfferComplaint/JobOfferIssueComplaint';
import ComplaintNotificationEvent from '../domain-events/JobOfferComplaint/JobOfferComplaintNotificationEvente';

export default class JobOfferComplaintNotification {
  private eventRecorder: IDomainEvent[] = [];
  constructor(private message: JobOfferComplaintMessage) {}

  public NotificationComplaint() {
    this.eventRecorder.push(new ComplaintNotificationEvent(this.message));
  }
}

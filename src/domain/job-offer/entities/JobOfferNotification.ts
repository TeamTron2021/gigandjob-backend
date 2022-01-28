import IDomainEvent from '../../../shared/domain/IDomainEvent';
import JobOfferPublishedNotification from '../domain-events/job-offer/Notification/JobOfferPublisedNotification';
import JobOfferSuspendedNotification from '../domain-events/job-offer/Notification/JobOfferSuspendedNotification';
import { OfferStatus } from '../shared/OfferStatus.enum';
import { JobOfferNotificationContent } from '../value-objects/JobOffer/JobOfferNotificationContent';
import { JobOfferNotificationSubject } from '../value-objects/JobOffer/JobOfferNotificationSubject';
import JobOffer from './JobOffer.aggregate';

export default class JobOfferNotification {
  private eventRecorder: IDomainEvent[] = [];
  constructor(
    private readonly subject: JobOfferNotificationSubject,
    private readonly content: JobOfferNotificationContent,
    private readonly JobOffer: JobOffer<OfferStatus>,
  ) {}

  public sendSuspensionOffer() {
    this.eventRecorder.push(
      new JobOfferSuspendedNotification(
        this.JobOffer.getOfferId(),
        this.subject,
        this.content,
      ),
    );
  }

  public sendPublishedOffer() {
    this.eventRecorder.push(
      new JobOfferPublishedNotification(
        this.JobOffer.getOfferId(),
        this.subject,
        this.content,
      ),
    );
  }

  public sendRevokedOffer() {
    this.eventRecorder.push(
      new JobOfferPublishedNotification(
        this.JobOffer.getOfferId(),
        this.subject,
        this.content,
      ),
    );
  }

  public sendRemoveOffer() {
    this.eventRecorder.push(
      new JobOfferPublishedNotification(
        this.JobOffer.getOfferId(),
        this.subject,
        this.content,
      ),
    );
  }

  public sendReactivatedOffer() {
    this.eventRecorder.push(
      new JobOfferPublishedNotification(
        this.JobOffer.getOfferId(),
        this.subject,
        this.content,
      ),
    );
  }
}

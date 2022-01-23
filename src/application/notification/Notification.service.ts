import { UserRegisteredNotificationSent } from '../../domain/notification/domain_events/UserRegisteredNotificationSent.event';
import { NotificationPublisher } from './Notification.publisher';
import { NotificationRepository } from './Notification.repository';

export class NotificationService<T> {
  constructor(
    private repository: NotificationRepository<T>,
    private publisher: NotificationPublisher<T>,
  ) {}

  find(uuid: string) {
    this.repository.find(uuid);
  }

  publishUserRegisteredNotificationSent(
    event: UserRegisteredNotificationSent<T>,
  ) {
    this.publisher.publishUserRegisteredNotificationSent(event);
  }
}

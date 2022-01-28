import { UserRegisteredNotificationSent } from '../../domain/notification/domain_events/UserRegisteredNotificationSent.event';

export interface NotificationPublisher<T> {
  publishUserRegisteredNotificationSent(
    event: UserRegisteredNotificationSent<T>,
  ): void;
}

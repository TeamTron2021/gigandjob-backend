import { CVLoadedNotificationSent } from 'src/domain/notification/domain_events/CVLoadedNotification.event';
import { UserRegisteredNotificationSent } from '../../domain/notification/domain_events/UserRegisteredNotificationSent.event';

export interface NotificationPublisher<T> {
  publishUserRegisteredNotificationSent(
    event: UserRegisteredNotificationSent<T>,
  ): void;

  publishCVLoadedNotificationSent(event: CVLoadedNotificationSent<T>): void;
}

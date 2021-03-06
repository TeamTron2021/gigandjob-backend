import { CVLoadedNotificationSent } from '../../../domain/notification/domain_events/CVLoadedNotification.event';
import { Notification } from '../../../domain/notification/Notification.aggreagate';
import { NotificationSubject } from '../../../domain/notification/values_objects/NotificationSubject.value';
import { NotificationCommand } from '../Notification.command';
import { NotificationService } from '../Notification.service';

export class SendCVLoadedNotification<T> implements NotificationCommand<T> {
  constructor(private readonly subject: string, private readonly content: T) {}

  execute(service: NotificationService<T>): void {
    const notification = new Notification<T>(
      new NotificationSubject(this.subject),
      this.content,
    );
    notification.notifyCVLoaded;

    notification
      .getEvents()
      .forEach((event) =>
        service.publishCVLoadedNotificationSent(
          event as CVLoadedNotificationSent<T>,
        ),
      );
  }
}

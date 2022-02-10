import { UserRegisteredNotificationSent } from '../../../domain/notification/domain_events/UserRegisteredNotificationSent.event';
import { Notification } from '../../../domain/notification/Notification.aggreagate';
import { NotificationSubject } from '../../../domain/notification/values_objects/NotificationSubject.value';
import { NotificationCommand } from '../Notification.command';
import { NotificationService } from '../Notification.service';

export class SendUserRegisteredNotification<T>
  implements NotificationCommand<T>
{
  constructor(private readonly subject: string, private readonly content: T) {}

  execute(service: NotificationService<T>): void {
    const notification = new Notification<T>(
      new NotificationSubject(this.subject),
      this.content,
    );
    notification.notifyUserRegistered();

    notification
      .getEvents()
      .forEach((event) =>
        service.publishUserRegisteredNotificationSent(
          event as UserRegisteredNotificationSent<T>,
        ),
      );
  }
}

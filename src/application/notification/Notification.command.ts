import { NotificationService } from './Notification.service';

export interface NotificationCommand<T> {
  execute(service: NotificationService<T>): void;
}

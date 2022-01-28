import { NotificationDto } from './Notification.dto';

export interface NotificationRepository<T> {
  find(uuid: string): NotificationDto<T>;
}

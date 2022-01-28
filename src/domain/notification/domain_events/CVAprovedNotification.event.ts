import { NotificationID } from '../values_objects/NotificationID.value';
import { NotificationSubject } from '../values_objects/NotificationSubject.value';

export class CVAprovedNotificationSent<T> {
  constructor(
    public ID: NotificationID,
    public subject: NotificationSubject,
    public content: T,
  ) {}
}

import IDomainEvent from '../../../../shared/domain/IDomainEvent';
import NotificationContent from '../../value-objects/employeer-notification/NotificationContent';
import NotificationSubject from '../../value-objects/employeer-notification/NotificationSubject';
import EmployeerId from '../../value-objects/employeer/EmployeerId';

export default class EmployeerSuspendedNotification implements IDomainEvent {
  constructor(
    public id: EmployeerId,
    public subject: NotificationSubject,
    public content: NotificationContent,
  ) {}
}

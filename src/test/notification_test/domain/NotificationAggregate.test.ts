import { CVAprovedNotificationSent } from '../../../domain/notification/domain_events/CVAprovedNotification.event';
import { CVLoadedNotificationSent } from '../../../domain/notification/domain_events/CVLoadedNotification.event';
import { CVRejectedNotificationSent } from '../../../domain/notification/domain_events/CVRejectedNotification.event';
import { UserReactivatedNotificationSent } from '../../../domain/notification/domain_events/UserReactivatedNotificationSent.event';
import { UserRegisteredNotificationSent } from '../../../domain/notification/domain_events/UserRegisteredNotificationSent.event';
import { UserSuspendedNotificationSent } from '../../../domain/notification/domain_events/UserSuspendedNotificationSent.event';
import { Notification } from '../../../domain/notification/Notification.aggreagate';
import { NotificationSubject } from '../../../domain/notification/values_objects/NotificationSubject.value';

class BasicNotificationContent {
  constructor(
    public from: string,
    public to: string,
    public via: string,
    public text: string,
  ) {}
}

describe('Notification Aggregate', () => {
  test('Should notify about User Registered', () => {
    const content = new BasicNotificationContent(
      'jotaro@joestar.com',
      'jolyne@joestar.com',
      'email',
      'Usuario exitosamente registrado',
    );
    const notification = new Notification<BasicNotificationContent>(
      new NotificationSubject('User registered'),
      content,
    );
    const event = new UserRegisteredNotificationSent<BasicNotificationContent>(
      notification.ID,
      new NotificationSubject('User registered'),
      content,
    );
    notification.notifyUserRegistered();
    expect(notification.getEvents()).toContainEqual(event);
  });
  test('Should notify about User Suspended', () => {
    const content = new BasicNotificationContent(
      'jotaro@joestar.com',
      'jolyne@joestar.com',
      'firebase',
      'Tu cuenta ha sido suspendida',
    );
    const notification = new Notification<BasicNotificationContent>(
      new NotificationSubject('User suspended'),
      content,
    );
    const event = new UserSuspendedNotificationSent<BasicNotificationContent>(
      notification.ID,
      new NotificationSubject('User suspended'),
      content,
    );
    notification.notifyUserSuspended();
    expect(notification.getEvents()).toContainEqual(event);
  });
  test('Should notify about User Reactivated', () => {
    const content = new BasicNotificationContent(
      'jotaro@joestar.com',
      'jolyne@joestar.com',
      'firebase',
      'Tu cuenta ha sido reactivada',
    );
    const notification = new Notification<BasicNotificationContent>(
      new NotificationSubject('User reactivated'),
      content,
    );
    const event = new UserReactivatedNotificationSent<BasicNotificationContent>(
      notification.ID,
      new NotificationSubject('User reactivated'),
      content,
    );
    notification.notifyUserReactivated();
    expect(notification.getEvents()).toContainEqual(event);
  });
});
test('Should notify about CV Loaded', () => {
  const content = new BasicNotificationContent(
    'jotaro@joestar.com',
    'jolyne@joestar.com',
    'email',
    'Curriculum subido correctamente',
  );
  const notification = new Notification<BasicNotificationContent>(
    new NotificationSubject('CV loaded'),
    content,
  );
  const event = new CVLoadedNotificationSent<BasicNotificationContent>(
    notification.ID,
    new NotificationSubject('CV loaded'),
    content,
  );
  notification.notifyCVLoaded();
  expect(notification.getEvents()).toContainEqual(event);
});

test('Should notify about CV Approved', () => {
  const content = new BasicNotificationContent(
    'jotaro@joestar.com',
    'jolyne@joestar.com',
    'email',
    'Felicidades!, Su curriculum ha sido aprobado',
  );
  const notification = new Notification<BasicNotificationContent>(
    new NotificationSubject('CV approved'),
    content,
  );
  const event = new CVAprovedNotificationSent<BasicNotificationContent>(
    notification.ID,
    new NotificationSubject('CV approved'),
    content,
  );
  notification.notifyCVAproved();
  expect(notification.getEvents()).toContainEqual(event);
});

test('Should notify about CV Rejected', () => {
  const content = new BasicNotificationContent(
    'jotaro@joestar.com',
    'jolyne@joestar.com',
    'email',
    'Lo sentimos, Su curriculum ha sido rechazado',
  );
  const notification = new Notification<BasicNotificationContent>(
    new NotificationSubject('CV rejected'),
    content,
  );
  const event = new CVRejectedNotificationSent<BasicNotificationContent>(
    notification.ID,
    new NotificationSubject('CV rejected'),
    content,
  );
  notification.notifyCVRejected();
  expect(notification.getEvents()).toContainEqual(event);
});

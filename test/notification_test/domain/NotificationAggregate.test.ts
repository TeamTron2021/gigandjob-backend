import {UserReactivatedNotificationSent} from "../../../domain/notification/domain_events/UserReactivatedNotificationSent.event"
import {UserRegisteredNotificationSent} from "../../../domain/notification/domain_events/UserRegisteredNotificationSent.event"
import {UserSuspendedNotificationSent} from "../../../domain/notification/domain_events/UserSuspendedNotificationSent.event"
import {Notification} from "../../../domain/notification/Notification.aggreagate"
import {NotificationSubject} from "../../../domain/notification/values_objects/NotificationSubject.value"

class BasicNotificationContent {
	constructor(
		public from: string,
		public to: string,
		public via: string,
		public text: string
	){}
}

describe('Notification Aggregate', () =>{
	test('Should notify about User Registered',() =>{
		const content = new BasicNotificationContent(
			"jotaro@joestar.com",
			"jolyne@joestar.com",
			"email",
			"Usuario exitosamente registrado"
		)
		const notification = new Notification<BasicNotificationContent>(
				new NotificationSubject("User registered"),
				content
		)
		const event = new UserRegisteredNotificationSent<BasicNotificationContent>(
			notification.ID, 
			new NotificationSubject("User registered"),
			content
		)
		notification.notifyUserRegistered()
		expect(notification.getEvents()).toContainEqual(event)
	})
	test('Should notify about User Suspended',() =>{
		const content = new BasicNotificationContent(
			"jotaro@joestar.com",
			"jolyne@joestar.com",
			"firebase",
			"Tu cuenta ha sido suspendida"
		)
		const notification = new Notification<BasicNotificationContent>(
				new NotificationSubject("User suspended"),
				content
		)
		const event = new UserSuspendedNotificationSent<BasicNotificationContent>(
			notification.ID, 
			new NotificationSubject("User suspended"),
			content
		)
		notification.notifyUserSuspended()
		expect(notification.getEvents()).toContainEqual(event)
	})
	test('Should notify about User Reactivated',() =>{
		const content = new BasicNotificationContent(
			"jotaro@joestar.com",
			"jolyne@joestar.com",
			"firebase",
			"Tu cuenta ha sido reactivada"
		)
		const notification = new Notification<BasicNotificationContent>(
				new NotificationSubject("User reactivated"),
				content
		)
		const event = new UserReactivatedNotificationSent<BasicNotificationContent>(
			notification.ID, 
			new NotificationSubject("User reactivated"),
			content
		)
		notification.notifyUserReactivated()
		expect(notification.getEvents()).toContainEqual(event)
	})
})

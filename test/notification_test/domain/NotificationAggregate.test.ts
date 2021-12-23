import {randomUUID} from "crypto"
import {UserRegisteredNotificationSent} from "../../../domain/notification/domain_events/UserRegisteredNotificationSent.event"
import {NotificationIdEmpty} from "../../../domain/notification/errors/NotificationIdEmpty.error"
import {Notification} from "../../../domain/notification/Notification.aggreagate"
import {NotificationID} from "../../../domain/notification/values_objects/NotificationID.value"
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
})

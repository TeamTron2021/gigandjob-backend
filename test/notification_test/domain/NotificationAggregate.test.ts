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

	test('Should notify about CV Loaded',() =>{
		const content = new BasicNotificationContent(
			"jotaro@joestar.com",
			"jolyne@joestar.com",
			"email",
			"Curriculum subido correctamente"
		)
		const notification = new Notification<BasicNotificationContent>(
				new NotificationSubject("CV loaded"),
				content
		)
		const event = new UserRegisteredNotificationSent<BasicNotificationContent>(
			notification.ID, 
			new NotificationSubject("CV loaded"),
			content
		)
		notification.notifyCVLoaded()
		expect(notification.getEvents()).toContainEqual(event)
	})

	test('Should notify about CV Approved',() =>{
		const content = new BasicNotificationContent(
			"jotaro@joestar.com",
			"jolyne@joestar.com",
			"email",
			"Felicidades!, Su curriculum ha sido aprobado"
		)
		const notification = new Notification<BasicNotificationContent>(
				new NotificationSubject("CV approved"),
				content
		)
		const event = new UserRegisteredNotificationSent<BasicNotificationContent>(
			notification.ID, 
			new NotificationSubject("CV approved"),
			content
		)
		notification.notifyCVAproved()
		expect(notification.getEvents()).toContainEqual(event)
	})

	test('Should notify about CV Rejected',() =>{
		const content = new BasicNotificationContent(
			"jotaro@joestar.com",
			"jolyne@joestar.com",
			"email",
			"Lo sentimos, su curriculum ha sido rechazado"
		)
		const notification = new Notification<BasicNotificationContent>(
				new NotificationSubject("CV rejected"),
				content
		)
		const event = new UserRegisteredNotificationSent<BasicNotificationContent>(
			notification.ID, 
			new NotificationSubject("CV rejected"),
			content
		)
		notification.notifyCVRejected()
		expect(notification.getEvents()).toContainEqual(event)
	})
})

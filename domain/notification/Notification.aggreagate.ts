import {randomUUID} from "crypto";
import {UserReactivatedNotificationSent} from "./domain_events/UserReactivatedNotificationSent.event";
import {UserRegisteredNotificationSent} from "./domain_events/UserRegisteredNotificationSent.event";
import {UserSuspendedNotificationSent} from "./domain_events/UserSuspendedNotificationSent.event";
import {NotificationID} from "./values_objects/NotificationID.value";
import {NotificationSubject} from "./values_objects/NotificationSubject.value";

type NotificationEvents<T> = UserRegisteredNotificationSent<T>

export class Notification<T>{
	private _ID: NotificationID = new NotificationID(randomUUID())
	private readonly events: NotificationEvents<T>[] = []

	constructor(public subject: NotificationSubject, public content: T){}

	get ID(): NotificationID { return this._ID }
	getEvents(): NotificationEvents<T>[] { return this.events }

	notifyUserRegistered(){
		this.events.push(new UserRegisteredNotificationSent<T>(
			this._ID,
			this.subject,
			this.content
		))
	}

	notifyUserSuspended(){
		this.events.push(new UserSuspendedNotificationSent<T>(
			this._ID,
			this.subject,
			this.content
		))
	}

	notifyUserReactivated(){
		this.events.push(new UserReactivatedNotificationSent<T>(
			this._ID,
			this.subject,
			this.content
		))
	}
}

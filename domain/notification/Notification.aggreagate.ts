import {randomUUID} from "crypto";
import { CVAprovedNotificationSent } from "./domain_events/CVAprovedNotification.event";
import { CVLoadedNotificationSent } from "./domain_events/CVLoadedNotification.event";
import { CVRejectedNotificationSent } from "./domain_events/CVRejectedNotification.event";
import {UserRegisteredNotificationSent} from "./domain_events/UserRegisteredNotificationSent.event";
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

	notifyCVLoaded(){
		this.events.push(new CVLoadedNotificationSent<T>(
			this._ID,
			this.subject,
			this.content
		))
	}

	notifyCVAproved(){
		this.events.push(new CVAprovedNotificationSent<T>(
			this._ID,
			this.subject,
			this.content
		))
	}

	notifyCVRejected(){
		this.events.push(new CVRejectedNotificationSent<T>(
			this._ID,
			this.subject,
			this.content
		))
	}
}

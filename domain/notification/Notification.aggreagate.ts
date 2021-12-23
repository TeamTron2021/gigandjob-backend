import {randomUUID} from "crypto";
import {NotificationID} from "./values_objects/NotificationID.value";
import {NotificationSubject} from "./values_objects/NotificationSubject.value";

export class Notification<T>{
	private _ID: NotificationID = new NotificationID(randomUUID())

	constructor(public subject: NotificationSubject, public content: T){}

	get ID(): NotificationID { return this._ID }
}

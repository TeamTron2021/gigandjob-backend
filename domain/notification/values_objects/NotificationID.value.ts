import {NotificationIdEmpty} from "../errors/NotificationIdEmpty.error"

export class NotificationID{
	public readonly value: string

	constructor(value: string){
		if (!value || !value.trim()) throw new NotificationIdEmpty()
		this.value = value
	}
}

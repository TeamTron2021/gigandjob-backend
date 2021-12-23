import {NotificationSubjectEmpty} from "../errors/NotificationSubjectEmpty.error"

export class NotificationSubject{
	public readonly value: string

	constructor(value: string){
		if (!value || !value.trim()) throw new NotificationSubjectEmpty()
		this.value = value
	}
}

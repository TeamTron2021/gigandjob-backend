import {UserEmailEmpty} from "../errors/UserEmailEmpty.error"
import {UserEmailInvalid} from "../errors/UserEmailInvalid.error"

export class UserEmail {

	public readonly value: string
	private readonly regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	constructor(value: string){
		if (!value || !value.trim()) throw new UserEmailEmpty()
		if(!value.match(this.regex)) throw new UserEmailInvalid()
		this.value = value
	}
}

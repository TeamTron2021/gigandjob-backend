import {UserBirthdayEmpty} from "../errors/UserBirthdayEmpty.error"
import {UserBirthdayInvalid} from "../errors/UserBirthdayInvalid.error"

export class UserBirthday {
	public readonly value: Date

	constructor(value: Date){
		if (!value) throw new UserBirthdayEmpty()
		if (value > new Date()) throw new UserBirthdayInvalid()
		this.value = value
	}
}

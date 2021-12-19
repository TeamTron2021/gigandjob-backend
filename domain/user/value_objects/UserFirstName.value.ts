import {UserFirstNameEmpty} from "../errors/UserFirstNameEmpty.error"

export class UserFirstName {

	public readonly value: string

	constructor(value: string){
		if (!value || !value.trim()) throw new UserFirstNameEmpty()
		this.value = value
	}
}

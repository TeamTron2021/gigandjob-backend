import {UserFirstNameEmpty} from "../errors/UserFirstNameEmpty.error"

export class UserFirstName {

	public readonly value: string

	constructor(value: string){
		if (!value) throw new UserFirstNameEmpty()
		this.value = value
	}
}

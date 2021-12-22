import {UserIdEmpty} from "../errors/UserIdEmpty.error"


export class UserID {

	public readonly value: string

	constructor(value: string){
		if (!value || !value.trim()) throw new UserIdEmpty()
		this.value = value
	}
}



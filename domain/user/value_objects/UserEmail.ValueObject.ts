export class UserEmail {

	public readonly value: string
	private readonly regex = /^(\w|-)+@([a-z])+(\.\w+)+/g

	constructor(value: string){
		if (!value) throw new Error("Empty value")
		if(!value.match(this.regex))throw new Error("Invalid email")
		this.value = value
	}
}

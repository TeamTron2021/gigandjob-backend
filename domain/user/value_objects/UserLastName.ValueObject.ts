export class UserLastName {

	public readonly value: string

	constructor(value: string){
		if (!value) throw new Error("Empty value")
		this.value = value
	}
}

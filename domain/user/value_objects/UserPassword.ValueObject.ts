export class UserPassword {

	public readonly value: string

	constructor(value: string){
		if (!value) throw new Error("Empty value")
		if (value.length < 8) throw new Error("Value too short")
		this.value = value
	}
}

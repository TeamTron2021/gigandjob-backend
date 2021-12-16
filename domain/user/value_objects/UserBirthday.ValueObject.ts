export class UserBirthday {
	public readonly value: Date

	constructor(value: Date){
		if (!value) throw new Error("Empty value")
		this.value = value
	}
}

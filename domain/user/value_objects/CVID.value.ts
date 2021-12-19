import { CVIdEmpty } from "../errors/CVIDEmpty.error"


export class CVID {

	public readonly value: string

	constructor(value: string){
		if (!value || !value.trim()) throw new CVIdEmpty()
		this.value = value
	}
}

import { CVSkillsEmpty } from "../errors/CVSkillsEmpty.error"

export class CVSkills {
    
	public readonly value: string[]

	constructor(value: string[]){
		if (value === null || value === undefined ) throw new CVSkillsEmpty()
		this.value = value
	}
}




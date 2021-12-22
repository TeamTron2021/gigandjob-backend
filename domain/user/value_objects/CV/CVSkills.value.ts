import { CVSkillsEmpty } from "../../errors/CV/CVSkillsEmpty.error";


export default class CVSkills {

    public readonly value: string

    constructor(value: string) { this.value = value}

   

    public getSkill() {
        return this.value;
    }

    public static create(skill: string) {
        if(skill === '' || skill === ' ' || skill == undefined || skill == null){
            throw new CVSkillsEmpty();
            
        }

        return new CVSkills(skill);
    }
}


import { IValueObject } from "../../../shared/domain/IValueObject";
import { CVSkillsEmpty } from "../errors/CVSkillsEmpty.error";



export default class CVSkills implements IValueObject {
    constructor(private readonly skill:string) {}

    equals(valueObject: CVSkills): boolean {
        return this.skill === valueObject.getSkill();
    }

    public getSkill() {
        return this.skill;
    }

    public static create(skill: string) {
        if(skill === '' || skill === ' ' || skill == undefined || skill == null){
            throw new CVSkillsEmpty();
            
        }

        return new CVSkills(skill);
    }
}


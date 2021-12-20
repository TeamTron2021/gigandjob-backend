import { IValueObject } from "../../../../shared/domain/IValueObject";
import JobOfferEmptySkillException from "../../exceptions/JobOffer/JobOfferEmptySkillException";

export default class JobOfferSkill implements IValueObject {
    constructor(private readonly skill:string) {}

    equals(valueObject: JobOfferSkill): boolean {
        return this.skill === valueObject.getSkill();
    }

    public getSkill() {
        return this.skill;
    }

    public static create(skill: string) {
        if(skill === '' || skill === ' ' || skill == undefined || skill == null){
            throw new JobOfferEmptySkillException(
                'La habilidad no puede estar vacia'
            )
        }

        return new JobOfferSkill(skill);
    }
}
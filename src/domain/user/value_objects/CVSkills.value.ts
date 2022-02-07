import { CVSkillsEmpty } from '../errors/CVSkillsEmpty.error';

export default class CVSkills {
  public readonly value: string[];

  constructor(value: string[]) {
    this.value = value;
  }

  public getSkill() {
    return this.value;
  }

  public static create(skill: string[]) {
    if (skill == undefined || skill == null || skill.length == 0) {
      throw new CVSkillsEmpty();
    }

    return new CVSkills(skill);
  }
}

import { CVSkillsEmpty } from '../../src/domain/user/errors/CVSkillsEmpty.error';
import CVSkills from '../../src/domain/user/value_objects/CVSkills.value';

describe('Testing value object JobOfferSkill', () => {
  it('Should thrown empty skill error', () => {
    expect(() => CVSkills.create('')).toThrow(new CVSkillsEmpty());
  });
  it('Should thrown empty skill error', () => {
    const skill: any = null;
    expect(() => CVSkills.create(skill)).toThrow(new CVSkillsEmpty());
  });
  it('Should return an instance of CVSkill', () => {
    const skill = 'Skill';
    const cvSkill = CVSkills.create(skill);
    const isSkill = cvSkill instanceof CVSkills;
    expect(isSkill).toBe(true);
  });
});

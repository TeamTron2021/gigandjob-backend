import { CVAcademicFormationEmpty } from '../../src/domain/user/errors/CVAcademicFormationEmpty.error';
import CVAcademicFormation from '../../src/domain/user/value_objects/CVAcademicFormation.value';

describe('Testing value object AcademicFormation', () => {
  it('Should thrown empty academic formation error', () => {
    expect(() => CVAcademicFormation.create('')).toThrow(
      new CVAcademicFormationEmpty(),
    );
  });
  it('Should thrown empty academic formation error', () => {
    const academic: any = null;
    expect(() => CVAcademicFormation.create(academic)).toThrow(
      new CVAcademicFormationEmpty(),
    );
  });
  it('Should return an instance of CVSkill', () => {
    const academic = 'Academic';
    const cvAcademicFormation = CVAcademicFormation.create(academic);
    const isAcademicFormation =
      cvAcademicFormation instanceof CVAcademicFormation;
    expect(isAcademicFormation).toBe(true);
  });
});

import { IValueObject } from '../../../../shared/domain/IValueObject';
import EmployeerEmptyIndustryException from '../../exceptions/employeer/EmployeerEmptyIndustryException';
import EmployeerInvalidIndustryException from '../../exceptions/employeer/EmployeerInvalidIndustryException';

export default class EmployeerIndustry implements IValueObject {
  constructor(private readonly industry: string) {}

  public equals(valueObject: EmployeerIndustry): boolean {
    return this.industry === valueObject.getIndustry();
  }

  public getIndustry() {
    return this.industry;
  }

  public static create(industry: string) {
    if (industry == undefined || industry == null) {
      throw new EmployeerEmptyIndustryException(
        'La industria no puede estar vacia',
      );
    }

    if (typeof industry != 'string') {
      throw new EmployeerInvalidIndustryException(
        'La industria tiene que ser un string',
      );
    }

    if (!industry.trim()) {
      throw new EmployeerEmptyIndustryException(
        'La industria no puede estar vacia',
      );
    }

    return new EmployeerIndustry(industry);
  }
}

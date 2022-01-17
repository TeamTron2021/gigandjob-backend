import { IValueObject } from '../../../../shared/domain/IValueObject';
import JobOfferVacantInvalid from '../../exceptions/JobOffer/JobOfferVacantInvalid';

export default class JobOfferVacant implements IValueObject {
  constructor(private readonly vacant: number) {}

  public equals(valueObject: JobOfferVacant): boolean {
    return this.vacant === valueObject.getVacants();
  }

  public getVacants() {
    return this.vacant;
  }

  public static create(vacant: number) {
    if (vacant < 0 || vacant == null || vacant == undefined) {
      throw new JobOfferVacantInvalid(
        'las vacantes no puede ser menores que 0',
      );
    }

    return new JobOfferVacant(vacant);
  }
}

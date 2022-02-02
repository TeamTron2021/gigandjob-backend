import { IValueObject } from '../../../../shared/domain/IValueObject';
import JobOfferInvalidDateException from '../../exceptions/JobOffer/JobOfferInvalidDateException';
import JobOfferMissingDateException from '../../exceptions/JobOffer/JobOfferMissingDateException';

export default class JobOfferDate implements IValueObject {
  private constructor(
    private readonly startDate: Date,
    private readonly finalDate: Date,
  ) {}

  equals(valueObject: JobOfferDate): boolean {
    return (
      this.startDate === valueObject.getStartDate() &&
      this.finalDate === valueObject.getFinalDate()
    );
  }

  public getStartDate() {
    return this.startDate;
  }

  public getFinalDate() {
    return this.finalDate;
  }

  public static create(startDate: Date, finalDate: Date) {
    if (!startDate) {
      throw new JobOfferMissingDateException(
        'La fecha de inicio no puede estar vacia ',
      );
    }

    if (!finalDate) {
      throw new JobOfferMissingDateException(
        'La fecha final no puede estar vacia ',
      );
    }

    if (!(startDate.constructor == Date)) {
      throw new JobOfferInvalidDateException('La fecha de inicio es invalida');
    }

    if (!(finalDate instanceof Date)) {
      throw new JobOfferInvalidDateException('La fecha final es invalida');
    }

    if (startDate > finalDate) {
      throw new JobOfferInvalidDateException(
        'La fecha de inicio no puede ser mayor a la fecha final',
      );
    }

    return new JobOfferDate(startDate, finalDate);
  }
}

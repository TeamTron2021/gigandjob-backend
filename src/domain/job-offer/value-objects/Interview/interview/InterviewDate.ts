import { IValueObject } from '../../../../../shared/domain/IValueObject';
import InterviewInvalidDateException from '../../../exceptions/Interview/Interview/InterviewInvalidDateException';
import InterviewMissingDateException from '../../../exceptions/Interview/Interview/InterviewMissingDateException';

export default class InterviewDate implements IValueObject {
  
  private constructor(
    private readonly startDate: Date,
  ) {}

  equals(valueObject: InterviewDate): boolean {
    return (
      this.startDate === valueObject.getStartDate()
    );
  }

  public getStartDate() {
    return this.startDate;
  }

  

  public static create(startDate: Date) {

    var dateNow = new Date();

    if (!startDate) {
      throw new InterviewMissingDateException(
        'La fecha de inicio no puede estar vacia ',
      );
    }

    if (!(startDate instanceof Date)) {
      throw new InterviewInvalidDateException('La fecha de inicio es invalida');
    }

    if (startDate < dateNow) {
      throw new InterviewInvalidDateException(
        'La fecha de inicio no puede ser menor a la fecha actual',
      );
    }

    return new InterviewDate(startDate);
  }
}

import { IValueObject } from '../../../../../shared/domain/IValueObject';
import InterviewInvalidDateException from '../../../exceptions/Interview/Interview/InterviewInvalidDateException';
import InterviewMissingDateException from '../../../exceptions/Interview/Interview/InterviewMissingDateException';

export default class InterviewDate implements IValueObject {
  
  private constructor(
    private readonly date: Date,
  ) {}

  equals(valueObject: InterviewDate): boolean {
    return (
      this.date === valueObject.getDate()
    );
  }

  public getDate() {
    return this.date;
  }

  

  public static create(date: Date) {

    var dateNow = new Date();

    if (!date) {
      throw new InterviewMissingDateException(
        'La fecha de inicio no puede estar vacia ',
      );
    }

    if (!(date instanceof Date)) {
      throw new InterviewInvalidDateException('La fecha de inicio es invalida');
    }

    if (date < dateNow) {
      throw new InterviewInvalidDateException(
        'La fecha de inicio no puede ser menor a la fecha actual',
      );
    }

    return new InterviewDate(date);
  }
}

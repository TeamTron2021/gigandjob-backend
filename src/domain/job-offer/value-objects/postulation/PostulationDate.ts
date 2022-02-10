import InterviewInvalidDateException from '../../exceptions/Interview/Interview/InterviewInvalidDateException';
import InterviewMissingDateException from '../../exceptions/Interview/Interview/InterviewMissingDateException';
import { PostulationDateEmpty } from '../../exceptions/postulation/PostulationDateEmpty';

export class PostulationDate {
  public readonly postulationDate: Date;

  constructor(date: Date) {
    if (!date) throw new PostulationDateEmpty();
    this.postulationDate = this.date;
  }

  get date(): Date {
    return this.postulationDate;
  }

  public static create(startDate: Date) {
    if (!startDate) {
      throw new InterviewMissingDateException(
        'La fecha de inicio no puede estar vacia ',
      );
    }
    if (!(startDate instanceof Date)) {
      throw new InterviewInvalidDateException('La fecha de inicio es invalida');
    }

    return new  PostulationDate(startDate);
  }
}

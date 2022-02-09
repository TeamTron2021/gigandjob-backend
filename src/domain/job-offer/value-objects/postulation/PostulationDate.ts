import { PostulationDateEmpty } from '../../exceptions/postulation/PostulationDateEmpty';

export class PostulationDate {
  public readonly postulationDate: Date;

  constructor(date: Date) {
    if (!date) throw new PostulationDateEmpty();
    this.postulationDate = date;
  }

  get date(): Date {
    return this.postulationDate;
  }
}

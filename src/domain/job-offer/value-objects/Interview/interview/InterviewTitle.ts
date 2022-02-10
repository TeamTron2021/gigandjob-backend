import { IValueObject } from '../../../../../shared/domain/IValueObject';
import InterviewEmptyTitleException from '../../../exceptions/Interview/Interview/InterviewEmptyTitleException';

export default class InterviewTitle implements IValueObject {
  constructor(private readonly interviewTitle: string) {}

  public equals(valueObject: InterviewTitle): boolean {
    return this.interviewTitle == valueObject.interviewTitle;
  }

  public static create(interviewTitle: string) {
    if (
      interviewTitle === '' ||
      interviewTitle === ' ' ||
      interviewTitle == null ||
      interviewTitle == undefined
    ) {
      throw new InterviewEmptyTitleException(
        'El titulo de la entrevista no puede estar vacio',
      );
    }
    return new InterviewTitle(interviewTitle);
  }

  public getTitle() {
    return this.interviewTitle;
  }
}

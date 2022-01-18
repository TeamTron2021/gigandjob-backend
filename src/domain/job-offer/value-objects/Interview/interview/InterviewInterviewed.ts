import { IValueObject } from '../../../../../shared/domain/IValueObject';
import EmptyInterviewInterviewedException from '../../../exceptions/Interview/Interview/InterviewEmptyInterviewedException';

export default class InterviewInterviewed implements IValueObject {
  private constructor(readonly interviewed: string) {}

  public equals(valueObject: InterviewInterviewed): boolean {
    return this.interviewed === valueObject.getInterviewed();
  }

  public getInterviewed() {
    return this.interviewed;
  }

  public static create(interviewed: string) {
    if (
      interviewed === '' ||
      interviewed === ' ' ||
      interviewed == undefined ||
      interviewed == null
    ) {
      throw new EmptyInterviewInterviewedException(
        'El Id del entrevistado no puede estar vacio',
      );
    }

    return new InterviewInterviewed(interviewed);
  }
}

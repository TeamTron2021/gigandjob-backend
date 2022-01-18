import { IValueObject } from '../../../../../shared/domain/IValueObject';
import EmptyInterviewInterviewerException from '../../../exceptions/Interview/Interview/InterviewEmptyInterviewedException';

export default class InterviewInterviewer implements IValueObject {
  private constructor(readonly interviewer: string) {}

  public equals(valueObject: InterviewInterviewer): boolean {
    return this.interviewer === valueObject.getInterviewer();
  }

  public getInterviewer() {
    return this.interviewer;
  }

  public static create(interviewer: string) {
    if (
      interviewer === '' ||
      interviewer === ' ' ||
      interviewer == undefined ||
      interviewer == null
    ) {
      throw new EmptyInterviewInterviewerException(
        'El Id del entrevistador no puede estar vacio',
      );
    }

    return new InterviewInterviewer(interviewer);
  }
}

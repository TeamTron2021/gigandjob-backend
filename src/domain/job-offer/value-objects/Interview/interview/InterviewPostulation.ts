import { IValueObject } from '../../../../../shared/domain/IValueObject';
import EmptyInterviewPostulationException from '../../../exceptions/Interview/Interview/InterviewEmptyPostulationException';

export default class InterviewPostulation implements IValueObject {
  private constructor(readonly postulation: string) {}

  public equals(valueObject: InterviewPostulation): boolean {
    return this.postulation === valueObject.getPostulation();
  }

  public getPostulation() {
    return this.postulation;
  }

  public static create(postulation: string) {
    if (
      postulation === '' ||
      postulation === ' ' ||
      postulation == undefined ||
      postulation == null
    ) {
      throw new EmptyInterviewPostulationException(
        'El Id de la postulacion no puede estar vacio',
      );
    }

    return new InterviewPostulation(postulation);
  }
}

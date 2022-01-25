import { IValueObject } from '../../../../../shared/domain/IValueObject';
import EmptyInterviewJobOfferException from '../../../exceptions/Interview/Interview/InterviewEmptyJobOfferException';

export default class InterviewJobOffer implements IValueObject {
  private constructor(readonly jobOffer: string) {}

  public equals(valueObject: InterviewJobOffer): boolean {
    return this.jobOffer === valueObject.getJobOffer();
  }

  public getJobOffer() {
    return this.jobOffer;
  }

  public static create(jobOffer: string) {
    if (
      jobOffer === '' ||
      jobOffer === ' ' ||
      jobOffer == undefined ||
      jobOffer == null
    ) {
      throw new EmptyInterviewJobOfferException(
        'El Id del entrevistador no puede estar vacio',
      );
    }

    return new InterviewJobOffer(jobOffer);
  }
}

import EmptyInterviewJobOfferException from '../../../../domain/job-offer/exceptions/Interview/Interview/InterviewEmptyIdException';
import InterviewJobOffer from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewJobOffer';
import UniqueId from '../../../../shared/domain/UniqueUUID';

describe('Testing value object InterviewJobOffer', () => {
  it('should throw empty id error', () => {
    const id = ' ';
    expect(() => InterviewJobOffer.create(id)).toThrowError(
      new EmptyInterviewJobOfferException(
        'El Id del entrevistador no puede estar vacio',
      ),
    );
  });
  it('should throw empty id error', () => {
    const id: any = null;
    expect(() => InterviewJobOffer.create(id)).toThrowError(
      new EmptyInterviewJobOfferException(
        'El Id del entrevistador no puede estar vacio',
      ),
    );
  });
  it('should return a InterviewJobOffer instance', () => {
    const id = new UniqueId().getId();
    const interviewJobOffer = InterviewJobOffer.create(id);
    const isInterviewJobOffer =
      interviewJobOffer instanceof InterviewJobOffer;
    expect(isInterviewJobOffer).toBe(true);
  });
});

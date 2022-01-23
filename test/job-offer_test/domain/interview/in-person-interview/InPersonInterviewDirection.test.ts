import InterviewEmptyDescriptionException from '../../../../../src/domain/job-offer/exceptions/Interview/Interview/InterviewEmptyDescriptionException';
import InPersonInterviewDirection from '../../../../../src/domain/job-offer/value-objects/Interview/InPersonInterview/InPersonInterviewDirection';

describe('Testing value object InPersonInterviewDirection', () => {
  it('Should return an empty offerDescriptionError', () => {
    expect(() => InPersonInterviewDirection.create(' ')).toThrowError(
      new InterviewEmptyDescriptionException(
        'La Direccion de la Entrevista no puede estar vacia',
      ),
    );
  });
  it('Should return an empty offerDescriptionError', () => {
    expect(() => InPersonInterviewDirection.create('')).toThrowError(
      new InterviewEmptyDescriptionException(
        'La Direccion de la Entrevista no puede estar vacia',
      ),
    );
  });
  it('Should return an empty offerDescriptionError', () => {
    const description: any = null;
    expect(() => InPersonInterviewDirection.create(description)).toThrowError(
      new InterviewEmptyDescriptionException(
        'La Direccion de la Entrevista no puede estar vacia',
      ),
    );
  });
  it('Should return a InPersonInterviewDirection instance', () => {
    const description = 'Direccion generica de una entrevista presencial';
    const inPersoninterviewUrlMInPersonInterviewDirection =
      InPersonInterviewDirection.create(description);
    const isDescription =
      inPersoninterviewUrlMInPersonInterviewDirection instanceof
      InPersonInterviewDirection;

    expect(isDescription).toBe(true);
  });
});

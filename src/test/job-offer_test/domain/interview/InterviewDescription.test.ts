import InterviewEmptyDescriptionException from '../../../../domain/job-offer/exceptions/Interview/Interview/InterviewEmptyDescriptionException';
import InterviewDescription from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription';

describe('Testing value object InterviewDescription', () => {
  it('Should return an empty offerDescriptionError', () => {
    expect(() => InterviewDescription.create(' ')).toThrowError(
      new InterviewEmptyDescriptionException(
        'La descripcion de la entrevista no puede estar vacio',
      ),
    );
  });
  it('Should return an empty offerDescriptionError', () => {
    expect(() => InterviewDescription.create('')).toThrowError(
      new InterviewEmptyDescriptionException(
        'La descripcion de la entrevista no puede estar vacio',
      ),
    );
  });
  it('Should return an empty offerDescriptionError', () => {
    const description: any = null;
    expect(() => InterviewDescription.create(description)).toThrowError(
      new InterviewEmptyDescriptionException(
        'La descripcion de la entrevista no puede estar vacio',
      ),
    );
  });
  it('Should return a InterviewDescription instance', () => {
    const description = 'Descripcion generica de una entrevista de trabajo';
    const interviewDescription = InterviewDescription.create(description);
    const isDescription = interviewDescription instanceof InterviewDescription;

    expect(isDescription).toBe(true);
  });
});

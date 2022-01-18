import JobOfferEmptyDescriptionException from '../../../../src/domain/job-offer/exceptions/JobOffer/JobOfferEmptyDescriptionException';
import JobOfferDescription from '../../../../src/domain/job-offer/value-objects/JobOffer/JobOfferDescription';

describe('Testing value object JobOfferDescription', () => {
  it('Should return an empty offerDescriptionError', () => {
    expect(() => JobOfferDescription.create(' ')).toThrowError(
      new JobOfferEmptyDescriptionException(
        'La oferta tiene que tener una descripcion',
      ),
    );
  });
  it('Should return an empty offerDescriptionError', () => {
    expect(() => JobOfferDescription.create('')).toThrowError(
      new JobOfferEmptyDescriptionException(
        'La oferta tiene que tener una descripcion',
      ),
    );
  });
  it('Should return an empty offerDescriptionError', () => {
    const description: any = null;
    expect(() => JobOfferDescription.create(description)).toThrowError(
      new JobOfferEmptyDescriptionException(
        'La oferta tiene que tener una descripcion',
      ),
    );
  });
  it('Should return a JobOfferDescription instance', () => {
    const description = 'Descripcion generica de una oferta de trabajo';
    const jobOfferDescription = JobOfferDescription.create(description);
    const isDescription = jobOfferDescription instanceof JobOfferDescription;

    expect(isDescription).toBe(true);
  });
});

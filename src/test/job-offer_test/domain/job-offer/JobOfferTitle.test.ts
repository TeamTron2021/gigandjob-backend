import JobOfferEmptyTitleException from '../../../../domain/job-offer/exceptions/JobOffer/JobOfferEmptyTitleException';
import JobOfferTItle from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferTitle';

describe('Value Object JobOfferTitle', () => {
  it('Should return an error ,  title empty', () => {
    const title = '';
    expect(() => JobOfferTItle.create(title)).toThrow(
      new JobOfferEmptyTitleException(
        'El titulo de la oferta no puede estar vacio',
      ),
    );
  });
  it('Should create a title for the offer', () => {
    const title = 'Oferta de trabajo generica';
    const jobOfferTitle = JobOfferTItle.create(title);
    const isTitle = jobOfferTitle instanceof JobOfferTItle;
    expect(isTitle).toBe(true);
  });
});

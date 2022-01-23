import JobOfferInvalidDateException from '../../../../domain/job-offer/exceptions/JobOffer/JobOfferInvalidDateException';
import JobOfferMissingDateException from '../../../../domain/job-offer/exceptions/JobOffer/JobOfferMissingDateException';
import JobOfferDate from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferDate';

describe('Testing value object JobOfferDate', () => {
  it('Should throw an missing date error', () => {
    const initialDate = new Date();
    const finalDate: any = undefined;
    expect(() => JobOfferDate.create(initialDate, finalDate)).toThrow(
      new JobOfferMissingDateException('La fecha final no puede estar vacia '),
    );
  });

  it('Should throw an invalid date error', () => {
    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() + 1);
    expect(() => JobOfferDate.create(initialDate, finalDate)).toThrow(
      new JobOfferInvalidDateException(
        'La fecha de inicio no puede ser mayor a la fecha final',
      ),
    );
  });

  it('Should return an instance of JobOfferDate ', () => {
    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = JobOfferDate.create(initialDate, finalDate);
    const isDate = date instanceof JobOfferDate;
    expect(isDate).toBe(true);
  });
});

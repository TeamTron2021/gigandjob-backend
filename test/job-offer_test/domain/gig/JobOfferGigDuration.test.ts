import GigAmountInvalidException from '../../../../src/domain/job-offer/exceptions/Gig/GigAmountInvalidException';
import GigEmptyTimeException from '../../../../src/domain/job-offer/exceptions/Gig/GigEmptyTimeException';
import GigTimeInvalidException from '../../../../src/domain/job-offer/exceptions/Gig/GigTimeInvalidException';
import { Time } from '../../../../src/domain/job-offer/shared/Time.enum';
import JobOfferGigDuration from '../../../../src/domain/job-offer/value-objects/Gig/JobOfferGigDuration';

describe('Testing valueObject jobOfferGigDuration', () => {
  it('Should throw an empty time error', () => {
    const time: any = null;
    const amount = 50;
    expect(() => JobOfferGigDuration.create(time, amount)).toThrow(
      new GigEmptyTimeException(
        'La unidad de tiempo de la duracion del gig no puede estar vacia',
      ),
    );
  });
  it('Should throw an Invalid time error', () => {
    const time: any = 'Dias';
    const amount = 50;
    expect(() => JobOfferGigDuration.create(time, amount)).toThrow(
      new GigTimeInvalidException('El tiempo no es valido'),
    );
  });
  it('Should throw an invalid amount of time error ', () => {
    const time = Time.Days;
    const amount = -50;
    expect(() => JobOfferGigDuration.create(time, amount)).toThrow(
      new GigAmountInvalidException(
        'La cantidad de tiempo no puede ser 0 o negativa',
      ),
    );
  });
  it('Should throw an invalid amount of time error ', () => {
    const time = Time.Days;
    const amount: any = undefined;
    expect(() => JobOfferGigDuration.create(time, amount)).toThrow(
      new GigAmountInvalidException(
        'La cantidad de tiempo no puede ser 0 o negativa',
      ),
    );
  });
  it('Should return a JobOfferGigDuration instance', () => {
    const time = Time.Days;
    const amount = 50;
    const gigDuration = JobOfferGigDuration.create(time, amount);
    const isGigDuration = gigDuration instanceof JobOfferGigDuration;
    expect(isGigDuration).toBe(true);
  });
});

import JobOfferComplaintDate from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferDateComplaint';

describe('Value Object JobOfferComplaintDate ', () => {
  test('Should return a error: JobOfferComplaintDate ', () => {
    const date: any = null;
    expect(() => JobOfferComplaintDate.create(date)).toThrowError(
      'La Fecha de JobOfferComplaint no puede estar vacio',
    );
  });
  test('Should return a error: JobOfferComplaintDate', () => {
    const date: any = undefined;
    expect(() => JobOfferComplaintDate.create(date)).toThrowError(
      'La Fecha de JobOfferComplaint no puede estar vacio',
    );
  });
  test('Should return the happy path', () => {
    const date: Date = new Date();
    expect(JobOfferComplaintDate.create(date)).toBeInstanceOf(
      JobOfferComplaintDate,
    );
  });
});

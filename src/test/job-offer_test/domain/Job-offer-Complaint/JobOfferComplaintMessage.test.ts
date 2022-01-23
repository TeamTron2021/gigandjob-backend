import JobOfferComplaintMessage from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaintMessage';

describe('Value Object JobOfferComplaintIssue', () => {
  test('Should return a error: JobOfferComplaintIssue ', () => {
    const message: any = null;
    expect(() => JobOfferComplaintMessage.create(message)).toThrowError(
      'El message de JobOfferComplaintMessage no puede ser undefined o null',
    );
  });
  test('Should return a error: JobOfferComplaintDate', () => {
    const message: any = undefined;
    expect(() => JobOfferComplaintMessage.create(message)).toThrowError(
      'El message de JobOfferComplaintMessage no puede ser undefined o null',
    );
  });
  test('Should return the happy path', () => {
    const message: any = 'Notificación de Se creo un reporte';
    expect(JobOfferComplaintMessage.create(message)).toBeInstanceOf(
      JobOfferComplaintMessage,
    );
  });
});

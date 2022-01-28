import JobOfferComplaintIssue from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferIssueComplaint';

describe('Value Object JobOfferComplaintIssue', () => {
  test('Should return a error: JobOfferComplaintIssue ', () => {
    const issue: any = null;
    expect(() => JobOfferComplaintIssue.create(issue)).toThrowError(
      'La Issue de JobOfferComplaint no puede ser undefined o null',
    );
  });
  test('Should return a error: JobOfferComplaintDate', () => {
    const issue: any = undefined;
    expect(() => JobOfferComplaintIssue.create(issue)).toThrowError(
      'La Issue de JobOfferComplaint no puede ser undefined o null',
    );
  });
  test('Should return the happy path', () => {
    const issue: any = 'Se Reporta algo del jobOffer';
    expect(JobOfferComplaintIssue.create(issue)).toBeInstanceOf(
      JobOfferComplaintIssue,
    );
  });
});

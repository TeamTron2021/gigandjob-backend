import { JobOfferComplaint } from '../../../../src/domain/job-offer/entities/JobOfferComplaint';
import JobOfferComplaintId from '../../../../src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaitId';
import JobOfferComplaintDate from '../../../../src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferDateComplaint';
import JobOfferComplaintIssue from '../../../../src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferIssueComplaint';
import UniqueId from '../../../../src/shared/domain/UniqueUUID';

describe('Testing likeOffer of JobOfferComplaintCreated', () => {
  test('Should return the happy path (instance)', () => {
    const id = JobOfferComplaintId.create(new UniqueId().getId());
    const issue = JobOfferComplaintIssue.create('Issue');
    const date = JobOfferComplaintDate.create(new Date());
    const complaint = JobOfferComplaint.create(id, issue, date);
    expect(complaint).toBeInstanceOf(JobOfferComplaint);
  });
});

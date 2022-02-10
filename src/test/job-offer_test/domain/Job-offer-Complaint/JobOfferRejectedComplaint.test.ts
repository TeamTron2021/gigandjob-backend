import { JobOfferComplaint } from '../../../../domain/job-offer/entities/JobOfferComplaint';
import JobOfferComplaintId from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaitId';
import JobOfferComplaintDate from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferDateComplaint';
import JobOfferComplaintIssue from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferIssueComplaint';
import UniqueId from '../../../../shared/domain/UniqueUUID';

describe('Testing likeOffer of JobOfferRejectedComplaint', () => {
  test('Should return the happy path (instance)', () => {
    const id = JobOfferComplaintId.create(new UniqueId().getId());
    const issue = JobOfferComplaintIssue.create('Issue');
    const date = JobOfferComplaintDate.create(new Date());
    const complaint = new JobOfferComplaint(id, issue, date, null);
    const test = JobOfferComplaint.rejectedComplaint(id,complaint);
    expect(test).toBeInstanceOf(JobOfferComplaint);
  });
});

import { JobOfferComplaint } from '../../../../src/domain/job-offer/entities/JobOfferComplaint';
import JobOfferComplaintId from '../../../../src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaitId';
import JobOfferComplaintDate from '../../../../src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferDateComplaint';
import JobOfferComplaintIssue from '../../../../src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferIssueComplaint';

import UniqueId from '../../../../src/shared/domain/UniqueUUID';

describe('Testing likeOffer of JobOfferAcepttedComplaint', () => {
  test('Should return the happy path (instance)', () => {
    const complaintarray: JobOfferComplaint[] = [];
    const id = JobOfferComplaintId.create(new UniqueId().getId());
    const issue = JobOfferComplaintIssue.create('Issue');
    const date = JobOfferComplaintDate.create(new Date());
    const complaint = new JobOfferComplaint(id, issue, date, null);
    complaintarray.push(complaint);
    const test = JobOfferComplaint.acceptedComplaint(id, complaintarray);
    expect(test).toBeInstanceOf(JobOfferComplaint);
  });
});

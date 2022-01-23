import { JobOfferLike } from '../../../../src/domain/job-offer/entities/JobOfferLike';

describe('Testing likeOffer of JobOfferlike', () => {
  test('Should return the happy path (instance)', () => {
    const JobOfferLikeNew = JobOfferLike.likeOffer(); //return jobofferlike with (id,true)
    expect(JobOfferLikeNew).toBeInstanceOf(JobOfferLike);
  });
});

import { JobOfferLike } from '../../../../domain/job-offer/entities/JobOfferLike';
import JobOfferLikedId from '../../../../domain/job-offer/value-objects/jobOfferLike/JobOfferLikeId';

describe('Testing removelike of JobOfferlike', () => {
  test('Should return error', () => {
    const likes: JobOfferLike[] = [];
    expect(() => JobOfferLike.removelike(likes)).toThrowError(
      'No hay likes a remover',
    );
  });
  test('Should return error', () => {
    const likes: JobOfferLike[] = [];
    const JobOfferLikeNew1 = JobOfferLike.likeOffer(); //Se grega like
    likes.push(JobOfferLikeNew1);
    const JobOfferLikeNew2 = JobOfferLike.likeOffer(); //Se grega like
    likes.push(JobOfferLikeNew2);

    JobOfferLike.removelike(likes); //Se Remueve Like
    JobOfferLike.removelike(likes); //Se Remueve Like
    expect(() => JobOfferLike.removelike(likes)).toThrowError(
      'No hay likes a remover',
    );
  });
  test('Should return the happy path of removelike (instance)', () => {
    const likes: JobOfferLike[] = [];
    const JobOfferLikeNew1 = JobOfferLike.likeOffer(); //Se grega like
    likes.push(JobOfferLikeNew1);
    const JobOfferLikeNew2 = JobOfferLike.likeOffer(); //Se grega like
    likes.push(JobOfferLikeNew2);

    const JobOfferLikeRemove1 = JobOfferLike.removelike(likes); //return object jobofferlike with (id,false)
    expect(JobOfferLikeRemove1).toBeInstanceOf(JobOfferLike);
  });
});

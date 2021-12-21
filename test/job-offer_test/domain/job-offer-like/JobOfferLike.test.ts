import { JobOfferLike } from "../../../../domain/job-offer/entities/JobOfferLike";
import JobOfferLikedId from "../../../../domain/job-offer/value-objects/jobOfferLike/JobOfferLikeId";
import UniqueId from "../../../../shared/domain/UniqueUUID";

describe('Value Object likeID', () =>{
	test('Should return the happy path (instance)',() =>{
		const JobOfferLikeNew = JobOfferLike.likeOffer() //return jobofferlike with (id,true)
		expect(JobOfferLikeNew).toBeInstanceOf(JobOfferLike)
	})
})

import { JobOfferLike } from "../domain/job-offer/entities/JobOfferLike";
import JobOfferLikedId from "../domain/job-offer/value-objects/JobOfferLikeId";
import UniqueId from "../shared/domain/UniqueUUID";

describe('Value Object likeID', () =>{
	test('Should return the happy path (instance)',() =>{
		const id = new UniqueId().getId(); // structure uuid "a24a6ea4-ce75-4665-a070-57453082c256"
        const JobOfferLikedIdNew = JobOfferLikedId.create(id); //value object return JobOfferLikedId 
		const JobOfferLikeNew = JobOfferLike.likeOffer(JobOfferLikedIdNew) //change value True, return jobofferlike with id,true
		expect(JobOfferLikeNew).toBeInstanceOf(JobOfferLike)
	})
})
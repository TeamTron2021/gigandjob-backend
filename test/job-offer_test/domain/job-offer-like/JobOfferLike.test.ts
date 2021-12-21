import { JobOfferLike } from "../../../../domain/job-offer/entities/JobOfferLike";


describe('Value Object likeID', () =>{
	test('Should return the happy path (instance)',() =>{
		const JobOfferLikeNew = JobOfferLike.likeOffer() //return jobofferlike with (id,true)
		expect(JobOfferLikeNew).toBeInstanceOf(JobOfferLike)
	})
})
import EmptyJobOfferIdException from "../../../domain/job-offer/exceptions/JobOffer/JobOfferEmptyIdException";
import JobOfferId from "../../../domain/job-offer/value-objects/JobOffer/JobOfferId";
import UniqueId from "../../../shared/domain/UniqueUUID";

describe('Testing value object JobOfferId', () => {
    it('should throw empty id error', () =>{
        const id = ' '; 
        expect(() => JobOfferId.create(id)).toThrowError(new EmptyJobOfferIdException(
            'El id del empleador no puede estar vacio'
        ))
    });
    it('should return a JobOfferId instance',()=>{
        const id = new UniqueId().getId();
        const jobOfferId =JobOfferId.create(id)
        const isJobOfferId = jobOfferId instanceof JobOfferId; 
        expect(isJobOfferId).toBe(true);
    })

})
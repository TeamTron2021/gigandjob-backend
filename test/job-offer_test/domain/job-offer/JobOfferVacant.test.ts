import JobOfferVacantInvalid from "../../../../domain/job-offer/exceptions/JobOffer/JobOfferVacantInvalid"
import JobOfferVacant from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferVacant';
describe('Testing value object JobOfferVacant', ()=>{
    it('Should throw invalid vacant error ', ()=>{
        expect(()=> JobOfferVacant.create(-50)).toThrow(new JobOfferVacantInvalid('las vacantes no puede ser menores que 0'));
    }); 
    it('Should return an instance of JobOfferVacant', ()=>{
        const vacants =5;
        const jobOfferVacant = JobOfferVacant.create(vacants); 
        const isVacant = jobOfferVacant instanceof JobOfferVacant; 
        expect(isVacant).toBe(true);
    })
})
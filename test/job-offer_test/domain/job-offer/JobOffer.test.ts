import JobOffer from '../../../../domain/job-offer/entities/JobOffer.aggregate'
import JobOfferDate from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferDate'
import JobOfferDescription from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferDescription'
import JobOfferId from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferId'
import JobOfferSalary from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferSalary'
import JobOfferSkill from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferSkill'
import JobOfferTItle from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferTitle'
import JobOfferVacant from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferVacant'
import UniqueId from '../../../../shared/domain/UniqueUUID'

describe('Testing JobOffer creation', ()=>{
    it('Should return a JobOffer instance', () =>{
        const skills: JobOfferSkill[] = [
            JobOfferSkill.create('SQL'), 
            JobOfferSkill.create('Mongo'), 
            JobOfferSkill.create('Inteligencia emocional')
        ];

        const initialDate = new Date(); 
        const finalDate = new Date(); 
        initialDate.setDate(finalDate.getDate() -1);
        const date = JobOfferDate.create(
            initialDate, 
            finalDate
        );
        
        const id = JobOfferId.create(new UniqueId().getId());
        const jobOffer = JobOffer.create(
            JobOfferDescription.create('Descripcion generica de una oferta de trabajo'), 
            JobOfferSalary.create(1500),
            skills, 
            JobOfferTItle.create('Titulo generico de una oferta'),
            JobOfferVacant.create(3),
            date, 
            id
        ); 
        expect(jobOffer).toBeInstanceOf(JobOffer);
    })
})
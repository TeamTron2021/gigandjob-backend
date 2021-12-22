import JobOffer from '../../../../domain/job-offer/entities/JobOffer.aggregate'
import { JobOfferComplaint } from '../../../../domain/job-offer/entities/JobOfferComplaint'
import { JobOfferLike } from '../../../../domain/job-offer/entities/JobOfferLike'
import JobOfferDate from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferDate'
import JobOfferDescription from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferDescription'
import JobOfferId from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferId'
import JobOfferSalary from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferSalary'
import JobOfferSkill from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferSkill'
import JobOfferTItle from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferTitle'
import JobOfferVacant from '../../../../domain/job-offer/value-objects/JobOffer/JobOfferVacant'
import JobOfferComplaintId from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaitId'
import JobOfferComplaintDate from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferDateComplaint'
import JobOfferComplaintIssue from '../../../../domain/job-offer/value-objects/JobOfferComplaint/JobOfferIssueComplaint'
import JobOfferLikedId from '../../../../domain/job-offer/value-objects/jobOfferLike/JobOfferLikeId'
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
        
        const likes: JobOfferLike[] = [
            //Inicia vacio
        ];

        const complaint: JobOfferComplaint[] = [
            //Inicia vacio
        ];
       
        const id = JobOfferId.create(new UniqueId().getId());
        const jobOffer = JobOffer.create(
            JobOfferDescription.create('Descripcion generica de una oferta de trabajo'), 
            JobOfferSalary.create(1500),
            skills,
            JobOfferTItle.create('Titulo generico de una oferta'),
            JobOfferVacant.create(3),
            likes,
            complaint,
            date, 
            id
        ); 

        const JobOfferLikeNew1 = JobOfferLike.likeOffer() ///Luego de creado se grega like
        likes.push(JobOfferLikeNew1);

        const postulation = Postulation.create(
            new PostulationDate(new Date())
        )
        expect(postulation).toBeInstanceOf(Postulation)
        
        const eventCreated = new PostulationCreated(
            postulation.getId(),
            postulation.getDate(),
            postulation.status
        )

        JobOfferLike.removelike(likes) //Se remueve el like
        
        jobOffer.addPostulation(postulation); 
        expect(jobOffer.getPostulations()).toContainEqual(postulation);

        JobOfferLike.removelike(likes) ///Luego de creado se remueve el like

        const complaintId = JobOfferComplaintId.create(new UniqueId().getId()); //Luego de creado se agrega una denuncia
        const issue = JobOfferComplaintIssue.create('Issue');
        const complaintDate = JobOfferComplaintDate.create(new Date());
        const createComplaint = JobOfferComplaint.create(complaintId,issue,complaintDate);
        complaint.push(createComplaint)

        expect(jobOffer).toBeInstanceOf(JobOffer);
    })
})
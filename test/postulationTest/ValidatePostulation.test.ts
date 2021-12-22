import { ValidateUserCanPostulate } from "../../domain/job-offer/domain-service/jobOffer/ValidateUserCanPostulateService"
import JobOffer from "../../domain/job-offer/entities/JobOffer.aggregate"
import { JobOfferLike } from "../../domain/job-offer/entities/JobOfferLike"
import { OfferStatus } from "../../domain/job-offer/shared/OfferStatus.enum"
import JobOfferDate from "../../domain/job-offer/value-objects/JobOffer/JobOfferDate"
import JobOfferDescription from "../../domain/job-offer/value-objects/JobOffer/JobOfferDescription"
import JobOfferId from "../../domain/job-offer/value-objects/JobOffer/JobOfferId"
import JobOfferSalary from "../../domain/job-offer/value-objects/JobOffer/JobOfferSalary"
import JobOfferSkill from "../../domain/job-offer/value-objects/JobOffer/JobOfferSkill"
import JobOfferTItle from "../../domain/job-offer/value-objects/JobOffer/JobOfferTitle"
import JobOfferVacant from "../../domain/job-offer/value-objects/JobOffer/JobOfferVacant"
import { UserStatus } from "../../domain/user/enums/UserStatus.enum"
import { User } from "../../domain/user/User.aggregate"
import { UserBirthday } from "../../domain/user/value_objects/UserBirthday.value"
import { UserEmail } from "../../domain/user/value_objects/UserEmail.value"
import { UserFirstName } from "../../domain/user/value_objects/UserFirstName.value"
import { UserLastName } from "../../domain/user/value_objects/UserLastName.value"
import { UserPassword } from "../../domain/user/value_objects/UserPassword.value"
import UniqueId from "../../shared/domain/UniqueUUID"

describe('Validate User can Apply to JobOffer', () => {
    test('User can apply to the job offer', () => {

        //Create a valid user 
        const user = User.register(
			new UserFirstName("Jotaro"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jotaro-kujo@joestar.com"), 
			new UserPassword("star-platinum")
		)
        
        const userConfirmed = user.confirm()
		expect(userConfirmed).toBeInstanceOf(User)
        expect(userConfirmed.status).toBe(UserStatus.Active)
        
        // Create a valid Job Offer
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
        
        const likes: JobOfferLike[] = [];

        const id = JobOfferId.create(new UniqueId().getId());
        const jobOffer = new JobOffer(
            JobOfferDescription.create('Descripcion'),
            JobOfferSalary.create(1300),
            skills,
            JobOfferTItle.create('Programador Backend express.js'),
            JobOfferVacant.create(7),
            likes,
            date,
            OfferStatus.published,
            id
            )
        
        const expectVacant = new JobOfferVacant(0)

        expect((jobOffer.vacant.getVacants()) > (expectVacant.getVacants()) ).toEqual(true)
        expect(jobOffer.status).toBe(OfferStatus.published)
        //const canApply: boolean = ValidateUserCanPostulate(userConfirmed, jobOffer)
        
        expect(ValidateUserCanPostulate(userConfirmed, jobOffer)).toEqual(true)

    })
    test('User cannot apply to the job offer, no more vacants avilable', () => {

        //Create a valid user 
        const user = User.register(
			new UserFirstName("Jotaro"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jotaro-kujo@joestar.com"), 
			new UserPassword("star-platinum")
		)
        
        const userConfirmed = user.confirm()
		expect(userConfirmed).toBeInstanceOf(User)
        expect(userConfirmed.status).toBe(UserStatus.Active)
        
        // Create a valid Job Offer
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
        
        const likes: JobOfferLike[] = [];

        const id = JobOfferId.create(new UniqueId().getId());
        const jobOffer = new JobOffer(
            JobOfferDescription.create('Descripcion'),
            JobOfferSalary.create(1300),
            skills,
            JobOfferTItle.create('Programador Backend express.js'),
            JobOfferVacant.create(0),
            likes,
            date,
            OfferStatus.published,
            id
            )
        
        
        expect(ValidateUserCanPostulate(userConfirmed, jobOffer)).toEqual(false)

    })
    test('User cannot apply to the job offer, user are suspended or not confirmed', () => {

        //Create a valid user 
        const user = User.register(
			new UserFirstName("Jotaro"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jotaro-kujo@joestar.com"), 
			new UserPassword("star-platinum")
		)
        
        
        // Create a valid Job Offer
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
        
        const likes: JobOfferLike[] = [];

        const id = JobOfferId.create(new UniqueId().getId());
        const jobOffer = new JobOffer(
            JobOfferDescription.create('Descripcion'),
            JobOfferSalary.create(1300),
            skills,
            JobOfferTItle.create('Programador Backend express.js'),
            JobOfferVacant.create(5),
            likes,
            date,
            OfferStatus.published,
            id
            )
        
        
        expect(ValidateUserCanPostulate(user, jobOffer)).toEqual(false)

    })
}

) 
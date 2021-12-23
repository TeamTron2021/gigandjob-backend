import { ValidateUserCanPostulate } from "../../domain/job-offer/domain-service/jobOffer/ValidateUserCanPostulateService"
import JobOffer from "../../domain/job-offer/entities/JobOffer.aggregate"
import { JobOfferComplaint } from "../../domain/job-offer/entities/JobOfferComplaint"
import { JobOfferLike } from "../../domain/job-offer/entities/JobOfferLike"
import { OfferStatus } from "../../domain/job-offer/shared/OfferStatus.enum"
import JobOfferDate from "../../domain/job-offer/value-objects/JobOffer/JobOfferDate"
import JobOfferDescription from "../../domain/job-offer/value-objects/JobOffer/JobOfferDescription"
import JobOfferId from "../../domain/job-offer/value-objects/JobOffer/JobOfferId"
import JobOfferSalary from "../../domain/job-offer/value-objects/JobOffer/JobOfferSalary"
import JobOfferSkill from "../../domain/job-offer/value-objects/JobOffer/JobOfferSkill"
import JobOfferTItle from "../../domain/job-offer/value-objects/JobOffer/JobOfferTitle"
import JobOfferVacant from "../../domain/job-offer/value-objects/JobOffer/JobOfferVacant"
import { CV } from "../../domain/user/entities/CV.entity"
import { CVStatus } from "../../domain/user/enums/CVStatus.enum"
import { UserStatus } from "../../domain/user/enums/UserStatus.enum"
import { User } from "../../domain/user/User.aggregate"
import CVAcademicFormation from "../../domain/user/value_objects/CVAcademicFormation.value"
import CVCourses from "../../domain/user/value_objects/CVCourses.value"
import CVSkills from "../../domain/user/value_objects/CVSkills.value"
import { UserBirthday } from "../../domain/user/value_objects/UserBirthday.value"
import { UserEmail } from "../../domain/user/value_objects/UserEmail.value"
import { UserFirstName } from "../../domain/user/value_objects/UserFirstName.value"
import { UserLastName } from "../../domain/user/value_objects/UserLastName.value"
import { UserPassword } from "../../domain/user/value_objects/UserPassword.value"
import UniqueId from "../../shared/domain/UniqueUUID"

describe('Validate User can Apply to JobOffer', () => {
    test('User can apply to the job offer', () => {

        //Create a valid CV
        const skillsCV: CVSkills[] = [
            CVSkills.create('SQL'), 
            CVSkills.create('Mongo'), 
            CVSkills.create('Inteligencia emocional')
        ];

        const courses: CVCourses[] = [
            CVCourses.create('Curso HTML'),
            CVCourses.create('Curso Platzi Inteligencia Artificial'),
            CVCourses.create('Manejo de Big Data')
        ];

        const academics: CVAcademicFormation[] = [
            CVAcademicFormation.create('Primaria'),
            CVAcademicFormation.create('Bachiller'),
            CVAcademicFormation.create('Universitario')
        ];

        //Create a valid user 
        const user = User.register(
			new UserFirstName("Jotaro"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jotaro-kujo@joestar.com"), 
			new UserPassword("star-platinum")
		)

        user.uploadCV(academics, skillsCV, courses)
        const userConfirmed = user.approveCV()
        
		expect(userConfirmed).toBeInstanceOf(User)
        expect(userConfirmed?.status).toBe(UserStatus.Active)
        expect(userConfirmed).not.toBe(undefined)
        expect(userConfirmed?.cv).not.toBeNull()
        expect(userConfirmed?.cv?.status).toEqual(CVStatus.Aproved)

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
        const complaint: JobOfferComplaint[] = [];
        const likes: JobOfferLike[] = [];

        const id = JobOfferId.create(new UniqueId().getId());
        const jobOffer = new JobOffer(
            JobOfferDescription.create('Descripcion'),
            JobOfferSalary.create(1300),
            skills,
            JobOfferTItle.create('Programador Backend express.js'),
            JobOfferVacant.create(7),
            likes,
            complaint,
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
    test('User cannot apply to the job offer, user status are suspended or unconfirmed ', () => {

        //Create a valid CV
        const skillsCV: CVSkills[] = [
            CVSkills.create('SQL'),  
            CVSkills.create('Mongo'), 
            CVSkills.create('Inteligencia emocional')
        ];

        const courses: CVCourses[] = [
            CVCourses.create('Curso HTML'),
            CVCourses.create('Curso Platzi Inteligencia Artificial'),
            CVCourses.create('Manejo de Big Data')
        ];

        const academics: CVAcademicFormation[] = [
            CVAcademicFormation.create('Primaria'),
            CVAcademicFormation.create('Bachiller'),
            CVAcademicFormation.create('Universitario')
        ];

        //Create a valid user 
        const user = User.register(
			new UserFirstName("Jotaro"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jotaro-kujo@joestar.com"), 
			new UserPassword("star-platinum")
		)

        user.uploadCV(academics, skillsCV, courses)
        
		expect(user).toBeInstanceOf(User)
        expect(user?.status).not.toBe(UserStatus.Active)
        expect(user).not.toBe(undefined)
        expect(user?.cv).not.toBeNull()

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
        const complaint: JobOfferComplaint[] = [];
        const likes: JobOfferLike[] = [];

        const id = JobOfferId.create(new UniqueId().getId());
        const jobOffer = new JobOffer(
            JobOfferDescription.create('Descripcion'),
            JobOfferSalary.create(1300),
            skills,
            JobOfferTItle.create('Programador Backend express.js'),
            JobOfferVacant.create(7),
            likes,
            complaint,
            date,
            OfferStatus.published,
            id
            )
        
        const expectVacant = new JobOfferVacant(0)

        expect(jobOffer).toBeInstanceOf(JobOffer)
        expect(jobOffer.status).toBe(OfferStatus.published)
        //const canApply: boolean = ValidateUserCanPostulate(userConfirmed, jobOffer)
        
        expect(ValidateUserCanPostulate(user, jobOffer)).toEqual(false)

    })
    test('User cannot apply to the job offer, user cv are not aproved ', () => {

        //Create a valid CV
        const skillsCV: CVSkills[] = [
            CVSkills.create('SQL'),  
            CVSkills.create('Mongo'), 
            CVSkills.create('Inteligencia emocional')
        ];

        const courses: CVCourses[] = [
            CVCourses.create('Curso HTML'),
            CVCourses.create('Curso Platzi Inteligencia Artificial'),
            CVCourses.create('Manejo de Big Data')
        ];

        const academics: CVAcademicFormation[] = [
            CVAcademicFormation.create('Primaria'),
            CVAcademicFormation.create('Bachiller'),
            CVAcademicFormation.create('Universitario')
        ];

        //Create a valid user 
        const user = User.register(
			new UserFirstName("Jotaro"), 
			new UserLastName("Kujo"), 
			new UserBirthday(new Date(0)), 
			new UserEmail("jotaro-kujo@joestar.com"), 
			new UserPassword("star-platinum")
		)

        user.uploadCV(academics, skillsCV, courses)
        
		expect(user).toBeInstanceOf(User)
        expect(user?.status).not.toBe(UserStatus.Active)
        expect(user).not.toBe(undefined)
        expect(user?.cv).not.toBeNull()
        expect(user.cv?.status).not.toBe(CVStatus.Aproved)

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
        const complaint: JobOfferComplaint[] = [];
        const likes: JobOfferLike[] = [];

        const id = JobOfferId.create(new UniqueId().getId());
        const jobOffer = new JobOffer(
            JobOfferDescription.create('Descripcion'),
            JobOfferSalary.create(1300),
            skills,
            JobOfferTItle.create('Programador Backend express.js'),
            JobOfferVacant.create(7),
            likes,
            complaint,
            date,
            OfferStatus.published,
            id
            )

        expect(jobOffer).toBeInstanceOf(JobOffer)
        expect(jobOffer.status).toBe(OfferStatus.published)
        //const canApply: boolean = ValidateUserCanPostulate(userConfirmed, jobOffer)
        
        expect(ValidateUserCanPostulate(user, jobOffer)).toEqual(false)

    })
}

) 
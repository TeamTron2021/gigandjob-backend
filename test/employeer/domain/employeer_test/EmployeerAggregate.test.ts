import Employeer from "../../../../domain/employeer/entities/Employeer.aggregate"
import { EmployeerStatus } from "../../../../domain/employeer/shared/EmployeerStatus.enum"
import EmployeerCompanyMail from "../../../../domain/employeer/value-objects/employeer/EmployeerCompanyMail"
import EmployeerCompanyName from "../../../../domain/employeer/value-objects/employeer/EmployeerCompanyName"
import EmployeerId from "../../../../domain/employeer/value-objects/employeer/EmployeerId"
import EmployeerIndustry from "../../../../domain/employeer/value-objects/employeer/EmployeerIndustry"
import EmployeerLocalization from "../../../../domain/employeer/value-objects/employeer/EmployeerLocalization"
import EmployeerRif from "../../../../domain/employeer/value-objects/employeer/EmployeerRif"
import JobOffer from "../../../../domain/job-offer/entities/JobOffer.aggregate"
import { JobOfferComplaint } from "../../../../domain/job-offer/entities/JobOfferComplaint"
import { JobOfferLike } from "../../../../domain/job-offer/entities/JobOfferLike"
import JobOfferDate from "../../../../domain/job-offer/value-objects/JobOffer/JobOfferDate"
import JobOfferDescription from "../../../../domain/job-offer/value-objects/JobOffer/JobOfferDescription"
import JobOfferId from "../../../../domain/job-offer/value-objects/JobOffer/JobOfferId"
import JobOfferSalary from "../../../../domain/job-offer/value-objects/JobOffer/JobOfferSalary"
import JobOfferSkill from "../../../../domain/job-offer/value-objects/JobOffer/JobOfferSkill"
import JobOfferTItle from "../../../../domain/job-offer/value-objects/JobOffer/JobOfferTitle"
import JobOfferVacant from "../../../../domain/job-offer/value-objects/JobOffer/JobOfferVacant"
import UniqueId from "../../../../shared/domain/UniqueUUID"

describe('Testing employeer creation', ()=>{
    it('Should return an Employeer instance ', ()=>{
        const id = EmployeerId.create(new UniqueId().getId());
        const latitude:any = '+90.0, -127.554334'; 
        const longitude:any = '47.1231231, 179.99999999'; 
        const employeerLocalization = EmployeerLocalization.create(latitude, longitude); 
        const employeer = Employeer.create(
            new EmployeerCompanyMail('empresasPolar@polar.com'), 
            new EmployeerCompanyName('Empresas Polar'), 
            id,
            new EmployeerIndustry('Alimentos'),
            new EmployeerRif('J-27784169-4'), 
            employeerLocalization
        ); 
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

        const jobOfferComplaint: JobOfferComplaint[] = [];
       
        const offerid = JobOfferId.create(new UniqueId().getId());
        const jobOffer = JobOffer.create(
            JobOfferDescription.create('Descripcion generica de una oferta de trabajo'),
            JobOfferSalary.create(1500), 
            skills, 
            JobOfferTItle.create('Titulo generico'), 
            JobOfferVacant.create(4), 
            likes, 
            jobOfferComplaint,
            JobOfferDate.create(initialDate, finalDate), 
            offerid

            
        ); 
        employeer.addJobOffer(jobOffer); 
        expect(employeer.getOffers()).toContainEqual(jobOffer);
        expect(employeer).toBeInstanceOf(Employeer);
    }); 
    it('Should update the employeer status', ()=>{
        const id = EmployeerId.create(new UniqueId().getId());
        const latitude:any = '+90.0, -127.554334'; 
        const longitude:any = '47.1231231, 179.99999999'; 
        const employeerLocalization = EmployeerLocalization.create(latitude, longitude); 
        const employeer = Employeer.create(
            new EmployeerCompanyMail('empresasPolar@polar.com'), 
            new EmployeerCompanyName('Empresas Polar'), 
            id,
            new EmployeerIndustry('Alimentos'),
            new EmployeerRif('J-27784169-4'), 
            employeerLocalization
        ); 
        expect(employeer.status).toBe(EmployeerStatus.NOT_SUSPENDED);

        expect(employeer.suspendEmployeer().status).toBe(EmployeerStatus.SUSPENDED);
    });

    it('Should return Remove a JobOffer of Employeer', ()=>{
        const id = EmployeerId.create(new UniqueId().getId());
        const latitude:any = '+90.0, -127.554334'; 
        const longitude:any = '47.1231231, 179.99999999'; 
        const employeerLocalization = EmployeerLocalization.create(latitude, longitude); 
        const employeer = Employeer.create(
            new EmployeerCompanyMail('empresasPolar@polar.com'), 
            new EmployeerCompanyName('Empresas Polar'), 
            id,
            new EmployeerIndustry('Alimentos'),
            new EmployeerRif('J-27784169-4'), 
            employeerLocalization
        ); 
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

        const jobOfferComplaint: JobOfferComplaint[] = [];
       
        const offerid = JobOfferId.create(new UniqueId().getId());
        const jobOffer = JobOffer.create(
            JobOfferDescription.create('Descripcion generica de una oferta de trabajo'),
            JobOfferSalary.create(1500), 
            skills, 
            JobOfferTItle.create('Titulo generico'), 
            JobOfferVacant.create(4), 
            likes, 
            jobOfferComplaint,
            JobOfferDate.create(initialDate, finalDate), 
            offerid            
        ); 
  
        employeer.addJobOffer(jobOffer); 

        const length = employeer.getOffers();
        expect(length).toHaveLength(1);
        JobOffer.JobOfferRemove(offerid,employeer.getOffers());
        const length2 = employeer.getOffers();
        expect(length2).toHaveLength(0);
        expect(employeer).toBeInstanceOf(Employeer);
    });
})
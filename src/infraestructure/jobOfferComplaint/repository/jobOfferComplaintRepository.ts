import { Injectable } from "@nestjs/common";
import { CreateJobOfferComplaintDtoOut } from "../../../application/JobOfferComplaint/dto/createJonOfferComplaintDtoOut";
import { JobOfferIdDtoInOut } from "../../../application/JobOfferComplaint/dto/JobOfferIdDto";
import { IjobOfferComplaintRepository } from "../../../application/JobOfferComplaint/out/IcomplaintRepository";
import { JobOfferORM } from "../../../infraestructure/job-offer/orm/job-offer.orm";
import { EntityRepository, Repository, getRepository } from "typeorm";
import { joboffercomplaintSchema } from "../orm/jobOfferComplaintOrm";

@EntityRepository(joboffercomplaintSchema)

@Injectable()
export class createjobOfferComplaintRepository extends Repository<joboffercomplaintSchema> implements IjobOfferComplaintRepository{

     async createjobOfferComplaint(complaintdto: CreateJobOfferComplaintDtoOut, idJobOffer: JobOfferIdDtoInOut): Promise<any>{
      
        const JobOfferGet = getRepository(JobOfferORM)
        const jobOffertest = await JobOfferGet.findOneOrFail({
            where: {id: idJobOffer.id}
          })   

        const complaintSaved = new joboffercomplaintSchema()
        complaintSaved.idjoboffercomplaint = complaintdto.Idcomplaint
        complaintSaved.issue = complaintdto.issue
        complaintSaved.date = complaintdto.dateComplaint
        complaintSaved.acceptedorrejected = complaintdto.acceptedOrRejected
        complaintSaved.JobOffer = jobOffertest
        return await this.save(complaintSaved);
    }  

    async UpdateAceptedobOfferComplaint(complaintdto: CreateJobOfferComplaintDtoOut): Promise<any>{

      const complaintSaved = new joboffercomplaintSchema()
      complaintSaved.idjoboffercomplaint = complaintdto.Idcomplaint
      complaintSaved.issue = complaintdto.issue
      complaintSaved.date = complaintdto.dateComplaint
      complaintSaved.acceptedorrejected = complaintdto.acceptedOrRejected
      return await this.update(complaintdto.Idcomplaint,complaintSaved);
  }  

}   

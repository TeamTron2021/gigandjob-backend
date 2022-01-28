import { Injectable } from "@nestjs/common";
import { CreateJobOfferComplaintDtoOut } from "src/application/JobOfferComplaint/dto/createJonOfferComplaintWriteDto";
import { IjobOfferComplaintRepository } from "src/application/JobOfferComplaint/out/IcomplaintRepository";
import { EntityRepository, Repository } from "typeorm";
import { joboffercomplaintSchema } from "../schema/jobOfferComplaintShema";


@EntityRepository(joboffercomplaintSchema)
@Injectable()
export class createjobOfferComplaintRepository extends Repository<joboffercomplaintSchema> implements IjobOfferComplaintRepository{

     async createjobOfferComplaint(complaint: CreateJobOfferComplaintDtoOut): Promise<any>{
        
        const complaintSaved = new joboffercomplaintSchema()
        complaintSaved.idjoboffercomplaint = complaint.Idcomplaint
        complaintSaved.issue = complaint.issue
        complaintSaved.date = complaint.dateComplaint
        complaintSaved.acceptedorrejected = complaint.acceptedOrRejected
        return await this.save(complaintSaved);
    }  
}
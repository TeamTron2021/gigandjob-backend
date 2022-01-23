import { IjobOfferComplaintRepository } from "src/aplication/JobOfferComplaint/out/IjobOfferComplaintRepository";
import { JobOfferComplaint } from "src/domain/job-offer/entities/JobOfferComplaint";
import { EntityRepository, Repository } from "typeorm";
import { joboffercomplaintSchema } from "../schema/jobOfferComplaintShema";


@EntityRepository(joboffercomplaintSchema)
export class createjobOfferComplaintRepository extends Repository<joboffercomplaintSchema> implements IjobOfferComplaintRepository{

     async createjobOfferComplaint(complaint: JobOfferComplaint): Promise<any>{
        
        const testSaved = new joboffercomplaintSchema()
        testSaved.idjoboffercomplaint = complaint.getId().getId();
        testSaved.issue = complaint.getissue().getId();
        testSaved.date = complaint.getdateComplaint().getDate();
        testSaved.acceptedorrejected = complaint.getAcceptedOrRejected()
        return await this.save(testSaved);
    }  
}
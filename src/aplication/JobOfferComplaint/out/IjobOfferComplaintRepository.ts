import { JobOfferComplaint } from "src/domain/job-offer/entities/JobOfferComplaint";
import { joboffercomplaintSchema } from "src/infraestructure/jobOfferComplaint/schema/jobOfferComplaintShema";

export interface IjobOfferComplaintRepository { 
    createjobOfferComplaint(complaint: JobOfferComplaint): Promise<any>;
  }

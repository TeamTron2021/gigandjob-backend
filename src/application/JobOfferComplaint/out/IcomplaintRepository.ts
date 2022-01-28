import { joboffercomplaintSchema } from "src/infraestructure/jobOfferComplaint/schema/jobOfferComplaintShema";
import { CreateJobOfferComplaintDtoOut } from "../dto/createJonOfferComplaintWriteDto";

export interface IjobOfferComplaintRepository { 
    createjobOfferComplaint(complaint: CreateJobOfferComplaintDtoOut): Promise<any>;
  }

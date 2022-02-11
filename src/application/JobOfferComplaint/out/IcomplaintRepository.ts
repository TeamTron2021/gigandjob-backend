import { CreateJobOfferComplaintDtoOut } from '../dto/createJonOfferComplaintDtoOut';
import { JobOfferIdDtoInOut } from '../dto/JobOfferIdDto';

export interface IjobOfferComplaintRepository {
  createjobOfferComplaint(
    complaint: CreateJobOfferComplaintDtoOut,
    idJobOffer: JobOfferIdDtoInOut,
  ): Promise<any>;
  UpdateAceptedobOfferComplaint(
    complaint: CreateJobOfferComplaintDtoOut,
  ): Promise<any>;
}

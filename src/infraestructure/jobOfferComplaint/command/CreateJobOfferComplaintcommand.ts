import { JobOfferIdDtoInOut } from "../../../application/JobOfferComplaint/dto/JobOfferIdDto";
import { CreateJobOfferComplaintDtoIn } from "../../../application/JobOfferComplaint/dto/createJobOfferComplaintDtoIn";

export class CreateJobOfferComplaintcommand {
    constructor(public readonly createJobOfferComplaintRequest: CreateJobOfferComplaintDtoIn, public readonly JobOfferIdRequest: JobOfferIdDtoInOut) {}
  }



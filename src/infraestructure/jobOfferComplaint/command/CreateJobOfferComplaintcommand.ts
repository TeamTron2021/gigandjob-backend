import { CreateJobOfferComplaintDtoIn } from "../../../application/JobOfferComplaint/dto/createJobOfferComplaintDto";

export class CreateJobOfferComplaintcommand {
    constructor(public readonly createJobOfferComplaintRequest: CreateJobOfferComplaintDtoIn) {}
  }



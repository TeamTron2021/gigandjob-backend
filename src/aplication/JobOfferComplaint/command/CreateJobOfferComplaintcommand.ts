import { CreateJobOfferComplaintDto } from "../dto/createJobOfferComplaintDto";

export class CreateJobOfferComplaintcommand {
    constructor(public readonly createJobOfferComplaintRequest: CreateJobOfferComplaintDto) {}
  }



import { ComplaintIdDtoInOut } from "../../../application/JobOfferComplaint/dto/ComplaintIdDto";
import { UpdateJobOfferComplaintDtoIn } from "../../../application/JobOfferComplaint/dto/updateJobOfferComplaintDto";

export class rejectJobOfferComplaintcommand {
    constructor(public readonly updateJobOfferComplaintRequest: UpdateJobOfferComplaintDtoIn , public readonly complaintIdRequest: ComplaintIdDtoInOut) {}
  }
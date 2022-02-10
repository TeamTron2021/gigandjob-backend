import { ComplaintIdDtoInOut } from "../../../application/JobOfferComplaint/dto/ComplaintIdDto";
import { UpdateJobOfferComplaintDtoIn } from "../../../application/JobOfferComplaint/dto/updateJobOfferComplaintDto";
export class acceptJobOfferComplaintcommand {
    constructor(public readonly updateJobOfferComplaintRequest: UpdateJobOfferComplaintDtoIn , public readonly complaintIdRequest: ComplaintIdDtoInOut) {}
  }
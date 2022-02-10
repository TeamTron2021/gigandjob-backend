import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { rejectJobOfferComplaintcommand } from "../../../infraestructure/jobOfferComplaint/command/rejectJobOfferComplaint";
import { mappersComplaint } from "../mappers/mapperComplaint";
import { JobOfferComplaintService } from "../Service/jobOfferComplaint.service";

@CommandHandler(rejectJobOfferComplaintcommand)
export class rejectComplaintHandler implements ICommandHandler<rejectJobOfferComplaintcommand> {
    constructor(
    private readonly _ComplaintRepository:JobOfferComplaintService,
    private readonly _Complaintmapper: mappersComplaint, 
  ) {}

   execute({ updateJobOfferComplaintRequest, complaintIdRequest}:rejectJobOfferComplaintcommand): Promise<any> {

    const rejectComplaint = this._Complaintmapper.convertDtoToDomainReject(updateJobOfferComplaintRequest,complaintIdRequest)
    return this._ComplaintRepository.updatejobOfferComplaint(rejectComplaint);
  }
}
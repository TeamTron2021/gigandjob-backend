
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobOfferComplaintService } from "../../../application/JobOfferComplaint/Service/jobOfferComplaint.service";
import { acceptJobOfferComplaintcommand } from "../../../infraestructure/jobOfferComplaint/command/AcceptJobOfferComplaintCommand";
import { mappersComplaint } from "../mappers/mapperComplaint";


@CommandHandler(acceptJobOfferComplaintcommand)
//@Injectable()
export class AcceptComplaintHandler implements ICommandHandler<acceptJobOfferComplaintcommand> {
    constructor(
    private readonly _ComplaintRepository:JobOfferComplaintService,
    private readonly _Complaintmapper: mappersComplaint, 
  ) {}

   execute({ updateJobOfferComplaintRequest, complaintIdRequest}: acceptJobOfferComplaintcommand): Promise<any> {

    const acceptedComplaint = this._Complaintmapper.convertDtoToDomainAccept(updateJobOfferComplaintRequest,complaintIdRequest)
    return this._ComplaintRepository.updatejobOfferComplaint(acceptedComplaint);
  }
}
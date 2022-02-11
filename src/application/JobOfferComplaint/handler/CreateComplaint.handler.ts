
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobOfferComplaintService } from "../../../application/JobOfferComplaint/Service/jobOfferComplaint.service";
import { CreateJobOfferComplaintcommand } from "../../../infraestructure/jobOfferComplaint/command/CreateJobOfferComplaintcommand";
import { mappersComplaint } from "../mappers/mapperComplaint";


@CommandHandler(CreateJobOfferComplaintcommand)
//@Injectable()
export class JobOfferComplaintHandler implements ICommandHandler<CreateJobOfferComplaintcommand> {
    constructor(
    private readonly _jobOfferRepository:JobOfferComplaintService,
    private readonly _jobOffermapper: mappersComplaint, 
  ) {}

   execute({ createJobOfferComplaintRequest, JobOfferIdRequest}: CreateJobOfferComplaintcommand): Promise<any> {

    const Complaint = this._jobOffermapper.convertDtoToDomainCreate(createJobOfferComplaintRequest)
    const JobOfferId = this._jobOffermapper.convertDtoToDomainCreateJobOffferid(JobOfferIdRequest)
    return this._jobOfferRepository.createjobOfferComplaint(Complaint, JobOfferId);
  }
}
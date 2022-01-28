
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JobOfferComplaintService } from "src/application/JobOfferComplaint/Service aplication/jobOfferComplaint.service";
import { CreateJobOfferComplaintcommand } from "../../../infraestructure/jobOfferComplaint/command/CreateJobOfferComplaintcommand";
import { mappersComplaint } from "../mappers/mapperomplaint";


@CommandHandler(CreateJobOfferComplaintcommand)
//@Injectable()
export class JobOfferComplaintHandler implements ICommandHandler<CreateJobOfferComplaintcommand> {
    constructor(
    private readonly _jobOfferRepository:JobOfferComplaintService,
    private readonly _jobOffermapper: mappersComplaint, 
  ) {}

   execute({ createJobOfferComplaintRequest }: CreateJobOfferComplaintcommand): Promise<any> {
    const probando = this._jobOffermapper.converttoJobofferComplaintDomain(createJobOfferComplaintRequest)
    return this._jobOfferRepository.createjobOfferComplaint(probando);
  }
}
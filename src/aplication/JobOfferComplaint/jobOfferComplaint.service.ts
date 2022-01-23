import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JobOfferComplaint } from "src/domain/job-offer/entities/JobOfferComplaint";
import JobOfferComplaintId from "src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferComplaitId";
import JobOfferComplaintDate from "src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferDateComplaint";
import JobOfferComplaintIssue from "src/domain/job-offer/value-objects/JobOfferComplaint/JobOfferIssueComplaint";
import { createjobOfferComplaintRepository } from "src/infraestructure/jobOfferComplaint/repository/jobOfferComplaintRepository";
import UniqueId from "src/shared/domain/UniqueUUID";
import { CreateJobOfferComplaintcommand } from "./command/CreateJobOfferComplaintcommand";
import { CreateJobOfferComplaintDto } from "./dto/createJobOfferComplaintDto";
import { IjobOfferComplaintRepository } from "./out/IjobOfferComplaintRepository";

Injectable()
@CommandHandler(CreateJobOfferComplaintcommand)
export class JobOfferComplaintService implements ICommandHandler<CreateJobOfferComplaintcommand> {
    constructor(
    @InjectRepository(createjobOfferComplaintRepository)
    private readonly _jobOfferRepository: IjobOfferComplaintRepository,    
  ) {}

  async execute({ createJobOfferComplaintRequest }: CreateJobOfferComplaintcommand): Promise<any> {
    const { issueDto, dateComplaintDto, acceptedOrRejectedDto} = createJobOfferComplaintRequest;
    const id = JobOfferComplaintId.create(new UniqueId().getId());
    const issue = JobOfferComplaintIssue.create(issueDto);
    const date = JobOfferComplaintDate.create(dateComplaintDto);
    const complaint = JobOfferComplaint.create(id, issue, date);
    return await this._jobOfferRepository.createjobOfferComplaint(complaint)
  }


/*
  async createJobOffer(
    jobOfferDto: DataJobOfferDto,
    employerId: number,
  ): Promise<CreatedJobOfferDto> {
    if (!jobOfferDto) {
      throw new BadRequestException('job offer data must be sent');
    }

    if (!employerId) {
      throw new BadRequestException('employer id must be sent');
    }

    const jobOffer: JobOffer =
      this._mapperJobOffer.toDomainFromShowDto(jobOfferDto);

    const savedJobOffer: JobOffer =
      await this._jobOfferRepository.createJobOffer(jobOffer, employerId);

    return plainToClass(CreatedJobOfferDto, savedJobOffer);
  }*/
}
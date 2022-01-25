import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import FindEmployeerById from 'src/application/employeer/queries/findEmployeerById.query';
import { CreateInterviewCommand } from 'src/application/job-offer/commands/createInterview.command';
import CreateJobOfferDto from 'src/application/job-offer/ports/createJobOffer.dto';
import { FindEmployeerByIdRequest } from 'src/infraestructure/employeer/request/findEmployeerById.request';
import UniqueId from 'src/shared/domain/UniqueUUID';
import createJobOfferRequestRequest from '../request/createJobOfferRequest.request';

@Injectable()
export class InterviewService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async createInterview(
    interview: createInterviewRequest,
    jobOffer: FindJobOfferByIdRequest,
  ) {
    const JobOffer = await this.queryBus.execute(
      new FindJobOfferById(jobOffer.id),
    );
    const interviewId: string = new UniqueId().getId();
    const newInterview: CreateInterviewDto = {
      ...interview,
      id: interviewId,
    };
    return await this.commandBus.execute(
      new CreateInterviewCommand(newInterview, JobOffer),
    );
  }
}

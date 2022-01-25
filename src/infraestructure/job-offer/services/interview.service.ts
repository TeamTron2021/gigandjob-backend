import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateInterviewCommand } from 'src/application/job-offer/commands/createInterview.command';
import CreateInterviewDto from 'src/application/job-offer/ports/createInterview.dto';
import FindJobOfferById from 'src/application/job-offer/queries/findJobOfferById.query';
import UniqueId from 'src/shared/domain/UniqueUUID';
import CreateInterviewRequest from '../request/createInterviewRequest.request';
import { FindJobOfferByIdRequest } from '../request/findJobOfferById.request';

@Injectable()
export class InterviewService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async createInterview(
    interview: CreateInterviewRequest,
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

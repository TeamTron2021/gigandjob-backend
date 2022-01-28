import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateInterviewCommand } from 'src/application/job-offer/commands/createInterview.command';
import CreateInterviewDto from 'src/application/job-offer/ports/createInterview.dto';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import FindInterviewById from 'src/application/job-offer/queries/findInterviewById.query';
import FindPostulationById from 'src/application/job-offer/queries/findPostulationById.query';
import UniqueId from 'src/shared/domain/UniqueUUID';
import CreateInterviewRequest from '../request/createInterviewRequest.request';
import { FindInterviewByIdRequest } from '../request/findInterviewById.request';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';

@Injectable()
export class InterviewService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async createInterview(
    interview: CreateInterviewRequest,
    postulation: FindPostulationByIdRequest,
  ) {
    const Postulation = await this.findPostulation(postulation.id);
    const interviewId: string = new UniqueId().getId();
    const newInterview: CreateInterviewDto = {
      ...interview,
      id: interviewId,
    };
    
   
    return await this.commandBus.execute(
      new CreateInterviewCommand(newInterview, Postulation),
    );
  }

  async findPostulation(id: string): Promise<PostulationFound> {
    return await await this.queryBus.execute(new FindPostulationById(id));
  }

  async findInterviewById(interviewId: FindInterviewByIdRequest) {
    const interview = await this.queryBus.execute(
      new FindInterviewById(interviewId.id),
    );
    return interview;
  }
}

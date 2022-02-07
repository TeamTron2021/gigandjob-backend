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
import AcceptInterviewDto from "../../../application/job-offer/ports/acceptInterview.dto";
import AcceptOnlineInterviewDto from "../../../application/job-offer/ports/acceptOnlineInterview.dto";

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
	
  async acceptInterview(interviewId: FindInterviewByIdRequest) {
    const interviewToAccept: AcceptInterviewDto = new AcceptOnlineInterviewDto();
	/*await this.findInterviewById(interviewId).then(() => {
		interviewToAccept.status = this.
	})*/
	
	const interviewDto: AcceptInterviewDto = new AcceptOnlineInterviewDto();
	interviewDto.id = interviewToAccept.id;
    
    return Promise.resolve(undefined);
  }
}

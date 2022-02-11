import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import CreateInterviewRequest from '../request/createInterviewRequest.request';
import { FindInterviewByIdRequest } from '../request/findInterviewById.request';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';
import AcceptInterviewDto from "../../../application/job-offer/ports/acceptInterview.dto";
import AcceptInterviewCommand from "../../../application/job-offer/commands/acceptInterview.command";
import {InterviewORM} from "../orm/interview.orm";
import { FindInterviewByPostulationRequest } from '../request/findInterviewByPostulation.request';
import {CreateInterviewCommand} from "../../../application/job-offer/commands/createInterview.command";
import FindInterviewById from "../../../application/job-offer/queries/findInterviewById.query";
import UniqueId from "../../../shared/domain/UniqueUUID";
import FindInterviewByPostulation from "../../../application/job-offer/queries/findInterviewByPostulation.query";
import PostulationFound from "../../../application/job-offer/ports/findPostulationResult.dto";
import CreateInterviewDto from "../../../application/job-offer/ports/createInterview.dto";
import FindPostulationById from "../../../application/job-offer/queries/findPostulationById.query";
import FindInterviewsQuery from "../../../application/job-offer/queries/findInterviews.query";

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
	
	/**
	 * Maneja la lógica de aceptar una entrevista, desde la capa de infraestructura.
	 *
	 * Busca la entrevista a aceptar para convertirla en un DTO y, así, ejecutarla junto con el comando
	 * de aceptar una entrevista.
	 *
	 * @param interviewId ID de la entrevista a aceptar.
	 *
	 * @return Entrevista Aceptada.
	 * */
  async acceptInterview(interviewId: FindInterviewByIdRequest) {
    const interviewToAccept: AcceptInterviewDto = await this.findInterviewById(interviewId)
	    .then((interviewFound: InterviewORM) => {
			return {
				id: interviewFound.id,
				status: interviewFound.status,
				postulation: interviewFound.postulation
			}
		});
	
	  return await this.commandBus.execute(
		  new AcceptInterviewCommand(interviewToAccept)
	  );
  }
	
  async findInterviewByPostulation(postulationId: FindInterviewByPostulationRequest) {
    const interview = await this.queryBus.execute(
      new FindInterviewByPostulation(postulationId.postulationId),
    );
    return interview;
  }
	
	async findInterviews() {
		return await this.queryBus.execute(
			new FindInterviewsQuery(),
		);
	}
}

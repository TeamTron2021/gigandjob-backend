import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InterviewRepository } from '../repositories/InterviewRepository.repository';
import InterviewFound from "../../../application/job-offer/ports/interviewFound.dto";
import FindInterviewByPostulation from "../../../application/job-offer/queries/findInterviewByPostulation.query";

@QueryHandler(FindInterviewByPostulation)
export class findInterviewByPostulationHandler
  implements IQueryHandler<FindInterviewByPostulation, InterviewFound[]>
{
  constructor(private readonly interviewRepository: InterviewRepository) {}

  async execute(query: FindInterviewByPostulation): Promise<InterviewFound[]> {
    return await this.interviewRepository.findByPostulation(query.postulationId);
  }
}

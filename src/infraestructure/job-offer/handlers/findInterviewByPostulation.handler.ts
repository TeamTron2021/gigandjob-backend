import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import InterviewFound from 'src/application/job-offer/ports/interviewFound.dto';
import FindInterviewByPostulation from 'src/application/job-offer/queries/findInterviewByPostulation.query';
import { InterviewRepository } from '../repositories/InterviewRepository.repository';

@QueryHandler(FindInterviewByPostulation)
export class findInterviewByPostulationHandler
  implements IQueryHandler<FindInterviewByPostulation, InterviewFound[]>
{
  constructor(private readonly interviewRepository: InterviewRepository) {}

  async execute(query: FindInterviewByPostulation): Promise<InterviewFound[]> {
    return await this.interviewRepository.findByPostulation(query.postulationId);
  }
}

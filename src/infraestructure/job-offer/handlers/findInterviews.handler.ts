import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import IFindInterviews from 'src/application/job-offer/handlers/findInterviews.handler';
import InterviewFound from 'src/application/job-offer/ports/findInterviewResult.dto';
import FindInterviewsQuery from 'src/application/job-offer/queries/findInterviews.query';
import { InterviewRepository } from '../repositories/InterviewRepository.repository';


@QueryHandler(FindInterviewsQuery)
export class FindInterviewsHandler
  extends IFindInterviews
  implements IQueryHandler<FindInterviewsQuery, InterviewFound[]>
{
  constructor(readonly interviewRepository: InterviewRepository) {
    super(interviewRepository);
  }

  async execute(_query: FindInterviewsQuery): Promise<InterviewFound[]> {
    return await this.interviewRepository.findInterviews();
  }
}

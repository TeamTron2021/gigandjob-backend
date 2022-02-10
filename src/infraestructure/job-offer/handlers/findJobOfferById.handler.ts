import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import FindOfferByIdQuery from 'src/application/job-offer/queries/findJobOfferById.query';
import { JobOfferRepository } from '../repositories/JobOfferRepository.repository';

@QueryHandler(FindOfferByIdQuery)
export class FindJobOfferHandler
  implements IQueryHandler<FindOfferByIdQuery, JobOfferFound>
{
  constructor(private readonly jobOfferRepository: JobOfferRepository) {}
  async execute(query: FindOfferByIdQuery): Promise<JobOfferFound> {
    return await this.jobOfferRepository.findJobOfferById(query.id);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import FindJobOfferById from 'src/application/job-offer/queries/findJobOfferById.query';
import { JobOfferRepository } from '../repositories/JobOfferRepository.repository';

@QueryHandler(FindJobOfferById)
export class findJobOfferByIdHandler
  implements IQueryHandler<FindJobOfferById, JobOfferFound>
{
  constructor(private readonly jobOfferRepository: JobOfferRepository) {}

  async execute(query: FindJobOfferById): Promise<JobOfferFound> {
    return await this.jobOfferRepository.findById(query.id);
  }
}

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import FindJobOfferById from 'src/application/employeer/queries/findJobOfferByID.query';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import { JobOfferRepository } from '../repositories/JobOfferRepository.repository';

@QueryHandler(FindJobOfferById)
export default class findJobOfferByIDHandler
  implements IQueryHandler<FindJobOfferById, JobOfferFound>
{
  constructor(private readonly jobOfferRepository: JobOfferRepository) {}

  async execute(query: FindJobOfferById): Promise<JobOfferFound> {
    return await this.jobOfferRepository.findJobOfferById(query.jobOffer);
  }
}

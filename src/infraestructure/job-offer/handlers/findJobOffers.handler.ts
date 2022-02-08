import { QueryHandler } from '@nestjs/cqrs';
import IFindJobOffersHandler from 'src/application/job-offer/handlers/findJobOffers.handler';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import JobOffersQuery from 'src/application/job-offer/queries/findJobOffers.query';
import { JobOfferRepository } from '../repositories/JobOfferRepository.repository';

@QueryHandler(JobOffersQuery)
export class FindJobOffersHandler extends IFindJobOffersHandler {
  constructor(readonly jobOfferRepository: JobOfferRepository) {
    super(jobOfferRepository);
  }

  async execute(): Promise<JobOfferFound[]> {
    return await this.jobOfferRepository.findJobOffers();
  }
}

import JobOffer from 'src/domain/job-offer/entities/JobOffer.aggregate';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import CreateJobOfferDto from '../ports/createJobOffer.dto';

export default interface IJobOfferRepository {
  createJobOffer(
    jobOfferDto: CreateJobOfferDto,
  ): Promise<JobOffer<OfferStatus>>;
}

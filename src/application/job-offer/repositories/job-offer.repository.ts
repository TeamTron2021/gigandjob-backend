import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateJobOfferDto from '../ports/createJobOffer.dto';
import JobOfferFound from '../ports/jobOfferFound.dto';

export default interface IJobOfferRepository {
  createJobOffer(
    jobOfferDto: CreateJobOfferDto,
    employeer: EmployeerFound,
  ): Promise<JobOfferFound>;
}

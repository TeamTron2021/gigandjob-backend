import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import JobOfferToSave from '../ports/jobOfferToSave.dto';

export default interface IJobOfferRepository {
  createJobOffer(
    jobOfferDto: JobOfferToSave,
    employeer: EmployeerFound,
  ): Promise<void>;
}

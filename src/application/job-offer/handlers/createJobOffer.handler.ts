import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import IJobOfferRepository from '../repositories/job-offer.repository';

export default abstract class ICreateJobOfferHandler {
  constructor(
    readonly jobOfferRepository: IJobOfferRepository,
    readonly createJobOfferService: IAplicationService,
  ) {}
}

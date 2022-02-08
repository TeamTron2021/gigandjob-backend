import IJobOfferRepository from '../repositories/job-offer.repository';

export default abstract class IFindJobOffersHandler {
  constructor(private readonly jobOffersRepository: IJobOfferRepository) {}
}

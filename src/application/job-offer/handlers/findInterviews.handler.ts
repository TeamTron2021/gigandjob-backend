import IInterviewRepository from '../repositories/job-offer.repository';

export default abstract class IFindInterviewsHandler {
  constructor(private readonly interviewsRepository: IInterviewRepository) {}
}

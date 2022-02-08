import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import IInterviewRepository from '../repositories/job-offer.repository';

export default abstract class ICreateInterviewHandler {
  constructor(
    readonly interviewRepository: IInterviewRepository,
    readonly createInterviewService: IAplicationService,
  ) {}
}

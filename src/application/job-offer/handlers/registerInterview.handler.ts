import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import IInterviewRepository from '../repositories/interview.repository';

export default abstract class IRegisterInterviewHandler {
  constructor(
    readonly interviewRepository: IInterviewRepository,
    readonly interviewService: IAplicationService,
    ) {}
}

import IInterviewRepository from '../repositories/interview.repository';

export default abstract class IRegisterInterviewHandler {
  constructor(readonly interviewRepository: IInterviewRepository) {}
}

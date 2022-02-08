import IInterviewRepository from '../repositories/interview.repository';

export default abstract class IFindInterviews {
  constructor(readonly interviewRepository: IInterviewRepository) {}
}

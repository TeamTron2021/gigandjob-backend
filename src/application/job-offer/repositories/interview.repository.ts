
import CreateInterviewDto from '../ports/createInterview.dto';
import InterviewFound from '../ports/interviewFound.dto';
import JobOfferFound from '../ports/jobOfferFound.dto';

export default interface IInterviewRepository {
  createInterview(
    interviewDto: CreateInterviewDto,
    jobOffer: JobOfferFound,
  ): Promise<InterviewFound>;
}

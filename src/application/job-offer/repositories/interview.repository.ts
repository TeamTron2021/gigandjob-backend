
import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateInterviewDto from '../ports/createInterview.dto';
import InterviewFound from '../ports/interviewFound.dto';

export default interface IInterviewRepository {
  createInterview(
    interviewDto: CreateInterviewDto,
    employeer: EmployeerFound,
  ): Promise<InterviewFound>;
}

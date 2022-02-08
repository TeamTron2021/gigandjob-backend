
import CreateInterviewDto from '../ports/createInterview.dto';
import InterviewFound from '../ports/interviewFound.dto';
import PostulationFound from '../ports/findPostulationResult.dto';

export default interface IInterviewRepository {
  createInterview(
    interviewDto: CreateInterviewDto,
    postulation: PostulationFound,
  ): Promise<InterviewFound>;

  findById(id: string): Promise<InterviewFound>;

  findInterviews(): Promise<InterviewFound[]>;
}

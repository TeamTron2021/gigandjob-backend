
import CreateInterviewDto from '../ports/createInterview.dto';
import InterviewFound from '../ports/interviewFound.dto';
import PostulationFound from '../ports/findPostulationResult.dto';
import AcceptInterviewDto from "../ports/acceptInterview.dto";

export default interface IInterviewRepository {
  createInterview(
    interviewDto: CreateInterviewDto,
    postulation: PostulationFound,
  ): Promise<InterviewFound>;
  
  /**
   * Actualiza el estado de la entrevista aceptada.
   *
   * @param acceptedInterview Entrevista aceptada.
   * */
  acceptInterview(acceptedInterview: AcceptInterviewDto): Promise<InterviewFound>;
}

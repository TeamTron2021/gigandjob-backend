import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import Interview from 'src/domain/job-offer/entities/interview';
import { InterviewStatus } from 'src/domain/job-offer/shared/InterviewStatus.enum';
import CreateInterviewMapper from '../mappers/createInterviewMapper';
import CreateInterviewDto from '../ports/createInterview.dto';
import InterviewToSaveDto from '../ports/InterviewToSave.dto';

export default class CreateInterviewService implements IAplicationService {
  execute(interviewDto: CreateInterviewDto): InterviewToSaveDto {
    const mapperDtoToDomain: CreateInterviewMapper = 
    new CreateInterviewMapper(
      interviewDto,
    );
    const interview: Interview<InterviewStatus> = mapperDtoToDomain.map();
    const interviewToSave: InterviewToSaveDto = {
      id: interview.getInterviewId().getId(),
      title: interview.title.getTitle(),
      description: interview.description.getDescription(),
      date: interview.date.getDate(),
      status: interview.status,
    };

    return interviewToSave;
  }
}

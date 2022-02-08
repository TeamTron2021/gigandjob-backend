import e from 'express';
import IDto from 'src/application/shared/interfaces/IDto';
import IAplicationService from '../../shared/interfaces/IAplicationService';
import InterviewDtoToDomainMapper from '../mappers/interviewToDomain.mapper';
import InterviewDto from '../ports/interview.dto';
import InterviewToSaveDto from '../ports/interviewToSave.dto';
export default class RegisterInterviewService implements IAplicationService {
  execute(interview: InterviewDto): InterviewToSaveDto {
    const mapperDtoToDomain: InterviewDtoToDomainMapper =
      new InterviewDtoToDomainMapper(interview);
    const interviewToValidate = mapperDtoToDomain.convertDTOToDomain();
    const interviewToSave: InterviewToSaveDto = {
      title: interviewToValidate.title.getTitle(),
      description: interviewToValidate.description.getDescription(),
      date: interviewToValidate.date.getDate(),
      status: interviewToValidate.status,
      id: interviewToValidate.getInterviewId().getId(),
    };
    return interviewToSave;
  }
}

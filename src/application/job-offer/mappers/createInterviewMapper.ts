
import CreateInterviewDto from '../ports/createInterview.dto';
import Interview from '../../../domain/job-offer/entities/interview';
import { InterviewStatus } from 'src/domain/job-offer/shared/InterviewStatus.enum';
import InterviewId from 'src/domain/job-offer/value-objects/Interview/interview/InterviewId';
import InterviewTitle from 'src/domain/job-offer/value-objects/Interview/interview/InterviewTitle';
import InterviewDescription from 'src/domain/job-offer/value-objects/Interview/interview/InterviewDescription';
import InterviewDate from 'src/domain/job-offer/value-objects/Interview/interview/InterviewDate';

export default class CreateInterviewMapper {
  constructor(private readonly interviewDto: CreateInterviewDto) {}

  public map(): Interview<InterviewStatus> {
    const {
      id,
      title,
      description,
      date,    
    } = this.interviewDto;
    const interviewId: InterviewId = this.convertToInterviewId(id);
    const interviewTitle: InterviewTitle = this.convertToInterviewTitle(title);
    const interviewDescription: InterviewDescription = this.convertToInterviewDescription(description);
    const interviewDate: InterviewDate = this.convertToInterviewDate(date);


    return Interview.create(
      interviewTitle,
      interviewDescription,
      interviewDate,
      interviewId,
    );
  }

  private convertToInterviewId(id: string): InterviewId {
    return InterviewId.create(id);
  }
  private convertToInterviewTitle(title: string): InterviewTitle {
    return InterviewTitle.create(title);
  }
  private convertToInterviewDescription(description: string): InterviewDescription {
    return InterviewDescription.create(description);
  }
  private convertToInterviewDate(date: Date): InterviewDate {
    return InterviewDate.create(new Date(Date.parse(date.toString())));
  }
}

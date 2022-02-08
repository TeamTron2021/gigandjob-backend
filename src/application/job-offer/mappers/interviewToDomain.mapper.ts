import Interview from "src/domain/job-offer/entities/Interview";
import { InterviewStatus } from "src/domain/job-offer/shared/InterviewStatus.enum";
import InterviewDate from "src/domain/job-offer/value-objects/Interview/interview/InterviewDate";
import InterviewDescription from "src/domain/job-offer/value-objects/Interview/interview/InterviewDescription";
import InterviewId from "src/domain/job-offer/value-objects/Interview/interview/InterviewId";
import InterviewTitle from "src/domain/job-offer/value-objects/Interview/interview/InterviewTitle";
import InterviewDto from "../ports/interview.dto";


export default class InterviewDtoToDomainMapper {

  constructor(private readonly interviewDto: InterviewDto) {}



  public convertDTOToDomain(): Interview<InterviewStatus> {
    const { id, title, description, date } =
      this.interviewDto;
    const idDomain: InterviewId = this.convertToInterviewId(id);
    const titleDomain: InterviewTitle = this.convertToTitle(title);
    const descriptionDomain: InterviewDescription = this.convertToDescription(description);
    const dateDomain: InterviewDate = this.convertToInterviewDate(date);
   
    return Interview.create(
      titleDomain,
      descriptionDomain,
      dateDomain,
      idDomain,
    );
  }
  private convertToTitle(title: string): InterviewTitle {
    return InterviewTitle.create(title);
  }
  private convertToDescription(description: string): InterviewDescription {
    return InterviewDescription.create(description);
  }
  private convertToInterviewId(id: string): InterviewId {
    return InterviewId.create(id);
  }
  private convertToInterviewDate(date: Date): InterviewDate {
    return InterviewDate.create(date);
  }
  
  
}

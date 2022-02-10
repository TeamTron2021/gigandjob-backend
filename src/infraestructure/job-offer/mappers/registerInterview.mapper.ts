import { BadRequestException } from "@nestjs/common";
import InterviewFound from "src/application/job-offer/ports/interviewFound.dto";
import Interview from "src/domain/job-offer/entities/Interview";
import { InterviewStatus } from "src/domain/job-offer/shared/InterviewStatus.enum";
import InterviewDate from "src/domain/job-offer/value-objects/Interview/interview/InterviewDate";
import InterviewDescription from "src/domain/job-offer/value-objects/Interview/interview/InterviewDescription";
import InterviewId from "src/domain/job-offer/value-objects/Interview/interview/InterviewId";
import InterviewTitle from "src/domain/job-offer/value-objects/Interview/interview/InterviewTitle";
import { InterviewORM } from "src/infraestructure/job-offer/orm/interview.orm";


export default class RegisterInterviewMapper {
  static convertManyInterviewsToFound(
    interviews: InterviewORM[],
  ): InterviewFound[] {
    const interviewsToReturn: InterviewFound[] = interviews.map((interview) => {
      const interviewFound: InterviewFound = {
        ...interview,
      };
      return interviewFound;
    });

    return interviewsToReturn;
  }
 /* public static convertRegisterInterviewRequestToDTO(
    id: string,
    interview: RegisterInterviewRequest,
  ): InterviewDto {
    const interviewDto: InterviewDto = {
      id: id,
      ...interview,
    };
    return interviewDto;
  }*/

  public static convertInterviewORMtoDomain(
    interviewORM: InterviewORM,
  ): Interview<InterviewStatus> {
    const {
      id,
      title,
      description,
      date,
      status,
    } = interviewORM;
    try {
      let interview: any = Interview.create(
        this.convertToInterviewTitle(title),
        this.convertToInterviewDescription(description),
        this.convertToInterviewDate(date),
        this.convertToInterviewId(id),
      );
      if (status == InterviewStatus.disabled) {
        interview = interview.suspendInterview();
      }
      return interview;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  public static convertToInterviewTitle(
    title: string,
  ): InterviewTitle {
    return InterviewTitle.create(title);
  }
  public static convertToInterviewDescription(
    description: string,
  ): InterviewDescription {
    return InterviewDescription.create(description);
  }
  public static convertToInterviewId(id: string): InterviewId {
    return InterviewId.create(id);
  }
  public static convertToInterviewDate(
    date: Date,
  ): InterviewDate {
    return InterviewDate.create(date,date);
  }
}
 
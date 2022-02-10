
import InterviewFound from 'src/application/job-offer/ports/interviewFound.dto';
import UniqueId from 'src/shared/domain/UniqueUUID';
import { InterviewORM } from '../orm/interview.orm';

export class InterviewMapper {

  public static convertToInterviewFound(interview: InterviewORM): InterviewFound {
    const newInterview: InterviewFound = {
      ...interview,
    };
    return newInterview;
  }
 
}

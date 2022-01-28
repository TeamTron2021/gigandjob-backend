import { InterviewStatus } from 'src/domain/job-offer/shared/InterviewStatus.enum';

export interface IChangeInterviewStatus {
  changeStatus(interview: InterviewStatus): InterviewStatus;
}

import { InterviewStatus } from '../../../shared/InterviewStatus.enum';
import InterviewId from '../../../value-objects/Interview/interview/InterviewId';

export class InterviewRejected {
  constructor(
    public interviewId: InterviewId,
    public status: InterviewStatus,
  ) {}
}

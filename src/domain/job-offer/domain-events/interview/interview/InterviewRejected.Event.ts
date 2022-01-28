import { InterviewStatus } from '../../../shared/InterviewStatus.enum';
import InterviewId from '../../../value-objects/Interview/interview/InterviewId';
import InterviewPostulation from '../../../value-objects/Interview/interview/InterviewPostulation';
import InterviewParticipant from '../../../value-objects/Interview/interview/InterviewParticipant';

export class InterviewRejected {
  constructor(
    public interviewId: InterviewId,
    public status: InterviewStatus,
    public participant: InterviewPostulation,
  ) {}
}

import IDomainEvent from '../../../../../shared/domain/IDomainEvent';
import { InterviewStatus } from '../../../shared/InterviewStatus.enum';
import InterviewTitle from '../../../value-objects/Interview/interview/InterviewTitle';
import InterviewDescription from '../../../value-objects/Interview/interview/InterviewDescription';
import InterviewDate from '../../../value-objects/Interview/interview/InterviewDate';
import InterviewId from '../../../value-objects/Interview/interview/InterviewId';
import InPersonInterviewDirection from '../../../value-objects/Interview/InPersonInterview/InPersonInterviewDirection';
import InterviewInterviewed from '../../../value-objects/Interview/interview/InterviewPostulation';

export default class InPersonInterviewCreated implements IDomainEvent {
  constructor(
    public id: InterviewId,
    public title: InterviewTitle,
    public description: InterviewDescription,
    public date: InterviewDate,
    public interviewed: InterviewInterviewed,
    public status: InterviewStatus,
    public urlMeeting: InPersonInterviewDirection,
  ) {}
}

import IDomainEvent from '../../../../../shared/domain/IDomainEvent';
import { InterviewStatus } from '../../../shared/InterviewStatus.enum';
import InterviewTitle from '../../../value-objects/Interview/interview/InterviewTitle';
import InterviewDescription from '../../../value-objects/Interview/interview/InterviewDescription';
import InterviewDate from '../../../value-objects/Interview/interview/InterviewDate';
import InterviewId from '../../../value-objects/Interview/interview/InterviewId';
import OnlineInterviewUrlMeeting from '../../../value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting';
import InterviewPostulation from '../../../value-objects/Interview/interview/InterviewPostulation';

export default class OnlineInterviewCreated implements IDomainEvent {
  constructor(
    public id: InterviewId,
    public title: InterviewTitle,
    public description: InterviewDescription,
    public date: InterviewDate,
    public postulation: InterviewPostulation,
    public status: InterviewStatus,
    public urlMeeting: OnlineInterviewUrlMeeting,
  ) {}
}

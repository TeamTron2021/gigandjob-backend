import IDomainEvent from '../../../../../../shared/domain/IDomainEvent';
import { InterviewStatus } from '../../../../shared/InterviewStatus.enum';
import InPersonInterviewDirection from '../../../../value-objects/Interview/InPersonInterview/InPersonInterviewDirection';
import InterviewDate from '../../../../value-objects/Interview/interview/InterviewDate';
import InterviewId from '../../../../value-objects/Interview/interview/InterviewId';

export default class InPersonInterviewRechedule implements IDomainEvent {
  constructor(
    public id: InterviewId,
    public date: InterviewDate,
    public status: InterviewStatus,
    public direction: InPersonInterviewDirection,
  ) {}
}

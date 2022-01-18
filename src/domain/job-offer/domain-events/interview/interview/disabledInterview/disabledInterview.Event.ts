import IDomainEvent from '../../../../../../shared/domain/IDomainEvent';
import { InterviewStatus } from '../../../../shared/InterviewStatus.enum';
import InterviewId from '../../../../value-objects/Interview/interview/InterviewId';

export default class disabledInterviewE implements IDomainEvent {
  constructor(public id: InterviewId, public status: InterviewStatus) {}
}

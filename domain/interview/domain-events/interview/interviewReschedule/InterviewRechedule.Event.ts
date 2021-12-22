
import IDomainEvent from "../../../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../../../shared/InterviewStatus.enum";
import InterviewDate from "../../../value-objects/interview/InterviewDate";
import InterviewId from "../../../value-objects/interview/InterviewId";


export default class InterviewRechedule implements IDomainEvent{

    constructor(
        public id: InterviewId,
        public date: InterviewDate,
        public status: InterviewStatus
        ){}

}
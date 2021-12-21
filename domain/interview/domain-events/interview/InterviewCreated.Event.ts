import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../../shared/InterviewStatus.enum";
import InterviewTitle from "../../value-objects/interview/InterviewTitle";
import InterviewDescription from "../../value-objects/interview/InterviewDescription";
import InterviewDate from "../../value-objects/interview/InterviewDate";
import InterviewId from "../../value-objects/interview/InterviewId";
import InterviewParticipant from "../../value-objects/interview/InterviewParticipant";

export default class InterviewCreated implements IDomainEvent{
    constructor(
        public id: InterviewId,
        public title: InterviewTitle,
        public description: InterviewDescription,
        public date: InterviewDate,
        public interviewed: InterviewParticipant,
        public interviewer: InterviewParticipant,
        public status: InterviewStatus
    ){};
}
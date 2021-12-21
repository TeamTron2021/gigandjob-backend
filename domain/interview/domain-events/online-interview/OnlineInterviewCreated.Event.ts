import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../../shared/InterviewStatus.enum";
import { InterviewId } from "../../value-objects/interviewId";
import { InterviewTitle } from "../../value-objects/interviewTitle";
import { InterviewDescription } from "../../value-objects/interviewDescription";
import { InterviewDate } from "../../value-objects/interviewDate";
import { InterviewParticipant } from "../../value-objects/interviewParticipant";
import { OnlineInterviewUrlMeeting } from "../../value-objects/OnlineInterviewUrlMeeting";

export default class OnlineInterviewCreated implements IDomainEvent{
    constructor(
        public id: InterviewId,
        public title: InterviewTitle,
        public description: InterviewDescription,
        public date: InterviewDate,
        public interviewed: InterviewParticipant,
        public interviewer: InterviewParticipant,
        public status: InterviewStatus,
        public urlMeeting: OnlineInterviewUrlMeeting
    ){};
}
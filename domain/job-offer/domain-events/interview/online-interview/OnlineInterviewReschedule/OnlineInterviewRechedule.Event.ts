
import IDomainEvent from "../../../../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../../../../shared/InterviewStatus.enum";
import InterviewDate from "../../../../value-objects/Interview/interview/InterviewDate";
import InterviewId from "../../../../value-objects/Interview/interview/InterviewId";
import OnlineInterviewUrlMeeting from "../../../../value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting";


export default class OnlineInterviewRechedule implements IDomainEvent{

    constructor(
        public id: InterviewId,
        public date: InterviewDate,
        public status: InterviewStatus,
        public urlMeeting: OnlineInterviewUrlMeeting
        ){}

}
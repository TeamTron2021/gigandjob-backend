import IDomainEvent from "../../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../../shared/InterviewStatus.enum";
import InterviewTitle from "../../value-objects/interview/InterviewTitle";
import InterviewDescription from "../../value-objects/interview/InterviewDescription";
import InterviewDate from "../../value-objects/interview/InterviewDate";
import InterviewId from "../../value-objects/interview/InterviewId";
import InPersonInterviewDirection from "../../value-objects/InPersonInterview/InPersonInterviewDirection";
import InterviewInterviewer from "../../value-objects/interview/InterviewInterviewer";
import InterviewInterviewed from "../../value-objects/interview/InterviewInterviewed";

export default class InPersonInterviewCreated implements IDomainEvent{
    constructor(
        public id: InterviewId,
        public title: InterviewTitle,
        public description: InterviewDescription,
        public date: InterviewDate,
        public interviewed: InterviewInterviewed,
        public interviewer: InterviewInterviewer,
        public status: InterviewStatus,
        public urlMeeting: InPersonInterviewDirection
    ){};
}
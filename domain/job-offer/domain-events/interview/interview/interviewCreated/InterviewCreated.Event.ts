import IDomainEvent from "../../../../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../../../../shared/InterviewStatus.enum";
import InterviewTitle from "../../../../value-objects/Interview/interview/InterviewTitle";
import InterviewDescription from "../../../../value-objects/Interview/interview/InterviewDescription";
import InterviewDate from "../../../../value-objects/Interview/interview/InterviewDate";
import InterviewId from "../../../../value-objects/Interview/interview/InterviewId";
import InterviewInterviewed from "../../../../value-objects/Interview/interview/InterviewInterviewed";
import InterviewInterviewer from "../../../../value-objects/Interview/interview/InterviewInterviewer";

export default class InterviewCreated implements IDomainEvent{
    constructor(
        public title: InterviewTitle,
        public description: InterviewDescription,
        public date: InterviewDate,
        public interviewed: InterviewInterviewed,
        public interviewer: InterviewInterviewer,
        public status: InterviewStatus,
        public Id: InterviewId,
    ){};
}
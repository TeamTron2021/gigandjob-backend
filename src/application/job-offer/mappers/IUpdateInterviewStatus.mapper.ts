import InterviewId from "../../../domain/job-offer/value-objects/Interview/interview/InterviewId";
import {InterviewStatus} from "../../../domain/job-offer/shared/InterviewStatus.enum";

export default interface IUpdateInterviewStatusMapper {
	convertToInterviewId(): InterviewId;
	
	convertToInterviewStatus(): InterviewStatus;
}
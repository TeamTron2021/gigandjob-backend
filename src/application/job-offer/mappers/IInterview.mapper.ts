import Interview from "../../../domain/job-offer/entities/Interview";
import {InterviewStatus} from "../../../domain/job-offer/shared/InterviewStatus.enum";

export default interface IInterviewMapper {
	map(): Interview<InterviewStatus>;
}
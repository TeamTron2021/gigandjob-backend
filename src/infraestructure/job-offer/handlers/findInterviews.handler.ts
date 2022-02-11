import {QueryHandler} from "@nestjs/cqrs";
import FindInterviewsQuery from "../../../application/job-offer/queries/findInterviews.query";
import IFindInterviewsHandler from "../../../application/job-offer/handlers/findInterviews.handler";
import {InterviewRepository} from "../repositories/InterviewRepository.repository";
import InterviewFound from "../../../application/job-offer/ports/interviewFound.dto";

@QueryHandler(FindInterviewsQuery)
export class FindInterviewsHandler extends IFindInterviewsHandler {
	constructor(readonly interviewRepository: InterviewRepository) {
		super(interviewRepository);
	}
	
	async execute(): Promise<InterviewFound[]> {
		return await this.interviewRepository.findInterviews();
	}
}
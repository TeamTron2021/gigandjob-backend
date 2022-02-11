import IInterviewRepository from "../repositories/interview.repository";

export default abstract class IFindInterviewsHandler {
	constructor(readonly interviewRepository: IInterviewRepository) {}
}
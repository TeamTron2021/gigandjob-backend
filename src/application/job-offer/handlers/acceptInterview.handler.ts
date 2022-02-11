import IInterviewRepository from "../repositories/interview.repository";
import IAplicationService from "../../shared/interfaces/IAplicationService";

export default abstract class IAcceptInterviewHandler {
	public constructor(
		public readonly interviewRepository: IInterviewRepository,
		public readonly acceptInterviewService: IAplicationService
	) {}
}
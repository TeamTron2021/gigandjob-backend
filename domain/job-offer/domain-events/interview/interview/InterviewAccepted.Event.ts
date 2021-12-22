import IDomainEvent from "../../../../../shared/domain/IDomainEvent";

export default class InterviewAccepted implements IDomainEvent {
	constructor(
		public readonly interviewId: string,
		public readonly interviewStatus: number
	) {}
}
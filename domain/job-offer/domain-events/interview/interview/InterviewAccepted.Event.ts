import IDomainEvent from "../../../../../shared/domain/IDomainEvent";

/**
 * Evento de dominio generado cuando el usuario acepta una entrevista.
 * */
export default class InterviewAccepted implements IDomainEvent {
	constructor(
		public readonly interviewId: string,
		public readonly interviewStatus: number
	) {}
}
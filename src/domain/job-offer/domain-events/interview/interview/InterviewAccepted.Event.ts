import IDomainEvent from '../../../../../shared/domain/IDomainEvent';
import InterviewId from '../../../value-objects/Interview/interview/InterviewId';
import { InterviewStatus } from '../../../shared/InterviewStatus.enum';

/**
 * Evento de dominio generado cuando el usuario acepta una entrevista.
 * */
export default class InterviewAccepted implements IDomainEvent {
  constructor(
    public readonly interviewId: InterviewId,
    public readonly interviewStatus: InterviewStatus,
  ) {}
}

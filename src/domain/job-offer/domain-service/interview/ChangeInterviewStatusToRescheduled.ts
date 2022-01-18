import { IChangeInterviewStatus } from './IChangeInterviewStatus';
import { InterviewStatus } from '../../shared/InterviewStatus.enum';
import InterviewCurrentlyDisabledException from '../../exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException';
import Interview from '../../entities/Interview';

/**
 * Servicio de dominio que devuelve el estado de "aceptada" para asignar a la entrevista.
 * */
export default class ChangeInterviewStatusToRescheduled extends IChangeInterviewStatus {
  /**
   * Verifica el estado actual de la entrevista y devuelve el estado deseado a asignar, solo si todas las
   * verificaciones han pasado exitosamente.
   *
   * @param interviewStatus Estado actual de la entrevista.
   * @return Nuevo estado a asignar a la entrevista.
   * @throws InterviewCurrentlyDisabledException
   * */
  public changeStatus(interviewStatus: InterviewStatus): InterviewStatus {
    if (interviewStatus == InterviewStatus.disabled) {
      throw new InterviewCurrentlyDisabledException(
        'La entrevista está actualmente deshabilitada.',
      );
    }

    return InterviewStatus.rescheduled;
  }
}

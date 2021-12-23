import {DomainService} from "../../../../shared/domain/DomainService";
import {InterviewStatus} from "../../shared/InterviewStatus.enum";

export abstract class IChangeInterviewStatus implements DomainService{
	constructor() {}
	
	/**
	 * Verifica el estado actual de la entrevista y devuelve el estado deseado a asignar, solo si todas las
	 * verificaciones han pasado exitosamente.
	 *
	 * @param interviewStatus Estado actual de la entrevista.
	 * @return Nuevo estado a asignar a la entrevista.
	 * */
	abstract changeStatus(interviewStatus: InterviewStatus): any;
}
import IAplicationService from "../../shared/interfaces/IAplicationService";
import AcceptInterviewDto from "../ports/acceptInterview.dto";
import UpdateInterviewStatusMapper from "../mappers/UpdateInterviewStatus.mapper";
import AcceptInterviewMapper from "../mappers/acceptInterview.mapper";
import {InterviewStatus} from "../../../domain/job-offer/shared/InterviewStatus.enum";
import Interview from "../../../domain/job-offer/entities/Interview";

/**
 * Servicio de aplicación para aceptar una entrevista.
 * */
export default class AcceptInterviewService implements IAplicationService {
	
	/**
	 * Retorna el DTO de una entrevista aceptada, luego de validar las reglas de dominio que le rigen.
	 *
	 * Convierte el DTO de la entrevista en una entidad, para luego cambiar su estado a aceptada (de acuerdo a las reglas
	 * de negocio de la capa de dominio).
	 *
	 * @param interviewDto La entrevista a aceptar.
	 *
	 * @return La entrevista aceptada.
	 *
	 * @throws UnknownInterviewStatusException
	 * @throws InterviewCurrentlyDisabledException
	 * */
	execute(interviewDto: AcceptInterviewDto): AcceptInterviewDto {
		let acceptedInterviewDto: AcceptInterviewDto;
		
		try {
			// Se convierte el DTO a entidad.
			const mapper: UpdateInterviewStatusMapper = new AcceptInterviewMapper(interviewDto);
			const interviewToAccept: Interview<InterviewStatus> = mapper.map();
			
			interviewToAccept.acceptInterview(); // Cambia el estado de la entrevista.
			
			acceptedInterviewDto = { // Cambio a DTO para ser guardado en el modelo de persistencia.
				id: interviewToAccept.Id.getId(),
				status: interviewToAccept.status,
				postulation: interviewDto.postulation
			};
		} catch (e) {
			throw e;
		}
		
		return acceptedInterviewDto;
	}
}
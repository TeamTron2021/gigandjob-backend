import AcceptInterviewDto from "../ports/acceptInterview.dto";
import {InterviewStatus} from "../../../domain/job-offer/shared/InterviewStatus.enum";
import InterviewId from "../../../domain/job-offer/value-objects/Interview/interview/InterviewId";
import IUpdateInterviewStatusMapper from "./IUpdateInterviewStatus.mapper";
import UnknownInterviewStatusException from "../exceptions/unknownInterviewStatus.exception";

export default class AcceptInterviewMapper implements IUpdateInterviewStatusMapper {
	constructor(
		private readonly interviewDto: AcceptInterviewDto
	) {}
	
	/**
	 * Toma el ID del DTO de entrevista, y devuelve un Value Object.
	 *
	 * @return Un Value Object para el ID de la entrevista.
	 * */
	convertToInterviewId(): InterviewId {
		let interviewId: InterviewId;
		
		try {
			interviewId = InterviewId.create(this.interviewDto.id);
		} catch (e) {
			throw e;
		}
		
		return interviewId;
	}
	
	/**
	 * Verifica el valor del estado del DTO de entrevista, y devuelve el valor correspondiente del Enumerado.
	 *
	 * @throws UnknownInterviewStatusException
	 * */
	convertToInterviewStatus(): InterviewStatus {
		switch (this.interviewDto.status) {
			case InterviewStatus.created:
				return InterviewStatus.created;
				
			case InterviewStatus.accepted:
				return InterviewStatus.accepted;
				
			case InterviewStatus.rescheduled:
				return InterviewStatus.rescheduled;
				
			case InterviewStatus.disabled:
				return InterviewStatus.disabled;
			
			case InterviewStatus.rejected:
				return InterviewStatus.rejected;
			
			case InterviewStatus.enable:
				return InterviewStatus.enable;
				
			default:
				throw new UnknownInterviewStatusException('Estado de la entrevista desconocido: ' + this.interviewDto.status);
		}
	}
}
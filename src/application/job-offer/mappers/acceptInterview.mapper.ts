import {InterviewStatus} from "../../../domain/job-offer/shared/InterviewStatus.enum";
import UpdateInterviewStatusMapper from "./UpdateInterviewStatus.mapper";
import Interview from "../../../domain/job-offer/entities/Interview";

export default class AcceptInterviewMapper extends UpdateInterviewStatusMapper {
	/**
	 * Retorna una entrevista a partir del ID y el estado contenido en el DTO de la entrevista a aceptar.
	 *
	 * @return Entrevista a aceptar.
	 *
	 * @throws UnknownInterviewStatusException
	 * */
	map(): Interview<InterviewStatus> {
		let interview: Interview<InterviewStatus>;
		
		try {
			interview = new Interview<InterviewStatus>(
				this.convertToInterviewId(),
				this.convertToInterviewStatus()
			);
		} catch (e) {
			throw e;
		}
		
		return interview;
	}
}
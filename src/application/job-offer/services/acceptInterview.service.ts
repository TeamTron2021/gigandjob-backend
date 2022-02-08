import IAplicationService from "../../shared/interfaces/IAplicationService";
import IDto from "../../shared/interfaces/IDto";
import AcceptInterviewDto from "../ports/acceptInterview.dto";
import JobOffer from "../../../domain/job-offer/entities/JobOffer.aggregate";
import IUpdateInterviewStatusMapper from "../mappers/IUpdateInterviewStatus.mapper";
import AcceptInterviewMapper from "../mappers/acceptInterview.mapper";

/**
 * Servicio de aplicación para aceptar una entrevista.
 * */
export default class AcceptInterviewService implements IAplicationService {
	execute(interviewDto: AcceptInterviewDto): IDto {
		const mapper: IUpdateInterviewStatusMapper = new AcceptInterviewMapper(interviewDto);
		const acceptedInterviewDto: AcceptInterviewDto = new AcceptInterviewDto();
		
		/*const {id, status} = JobOffer.acceptInterview(
			mapper.convertToInterviewId(), mapper.convertToInterviewStatus()
		);
		
		acceptedInterviewDto.id = id;*/
		
		return undefined;
	}
}
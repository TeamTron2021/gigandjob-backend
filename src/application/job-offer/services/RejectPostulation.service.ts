import IAplicationService from "src/application/shared/interfaces/IAplicationService";
import IDto from "src/application/shared/interfaces/IDto";
import AcceptPostulationMapper from "../mappers/AcceptPostulationMapper";
import IUpdatePostulationStatusMapper from "../mappers/IUpdatePostulationStatus.mapper";
import RejectPostulationDto from "../ports/RejectPostulationStatus.dto";


export default class RejectPostulationService implements IAplicationService {
	execute(postulationDto: RejectPostulationDto): IDto {
		const mapper: IUpdatePostulationStatusMapper = new AcceptPostulationMapper(postulationDto);
		const acceptedInterviewDto: RejectPostulationDto = new RejectPostulationDto();
		
		//implementar
		
		return undefined;
	}
}
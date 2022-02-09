import IAplicationService from "src/application/shared/interfaces/IAplicationService";
import IDto from "src/application/shared/interfaces/IDto";
import AcceptPostulationMapper from "../mappers/AcceptPostulationMapper";
import IUpdatePostulationStatusMapper from "../mappers/IUpdatePostulationStatus.mapper";
import AcceptPostulationDto from "../ports/AcceptPostulationStatus.dto";

export default class AcceptPostulationService implements IAplicationService {
	execute(postulationDto: AcceptPostulationDto): IDto {
		const mapper: IUpdatePostulationStatusMapper = new AcceptPostulationMapper(postulationDto);
		const acceptedInterviewDto: AcceptPostulationDto = new AcceptPostulationDto();
		
		//implementar
		
		return undefined;
	}
}
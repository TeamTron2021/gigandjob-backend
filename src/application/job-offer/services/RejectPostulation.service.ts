import IAplicationService from "src/application/shared/interfaces/IAplicationService";
import IDto from "src/application/shared/interfaces/IDto";
import { Postulation } from "src/domain/job-offer/entities/postulation";
import { PostulationStatus } from "src/domain/job-offer/value-objects/postulation/PostulationStatus";
import AcceptPostulationMapper from "../mappers/AcceptPostulationMapper";
import IUpdatePostulationStatusMapper from "../mappers/IUpdatePostulationStatus.mapper";
import AcceptPostulationDto from "../ports/AcceptPostulationStatus.dto";
import RejectPostulationDto from "../ports/RejectPostulationStatus.dto";


export default class RejectedPostulationService implements IAplicationService {
	execute(postulationDto: RejectPostulationDto): IDto {
		let RejectedPostulationDto: RejectPostulationDto;

		try {
			
			const mapper: IUpdatePostulationStatusMapper = new AcceptPostulationMapper(postulationDto);
			const postulationToAccept: Postulation<PostulationStatus> = mapper.map();
			
			postulationToAccept.acceptPostulation(); 
			
			RejectedPostulationDto = { 
				id: postulationToAccept.ID.idPostulation,
				status: postulationToAccept.status,
			};
		} catch (e) {
			throw e;
		}
		
		return RejectedPostulationDto;
	}
}
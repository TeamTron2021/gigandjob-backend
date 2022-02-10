import IAplicationService from "src/application/shared/interfaces/IAplicationService";
import IDto from "src/application/shared/interfaces/IDto";
import { Postulation } from "src/domain/job-offer/entities/postulation";
import { PostulationStatus } from "src/domain/job-offer/value-objects/postulation/PostulationStatus";
import AcceptPostulationMapper from "../mappers/AcceptPostulationMapper";
import IUpdatePostulationStatusMapper from "../mappers/UpdatePostulationStatus.mapper";
import AcceptPostulationDto from "../ports/AcceptPostulationStatus.dto";

export default class AcceptPostulationService implements IAplicationService {
	execute(postulationDto: AcceptPostulationDto): IDto {
		let acceptedPostulationDto: AcceptPostulationDto;

		try {
			
			const mapper: IUpdatePostulationStatusMapper = new AcceptPostulationMapper(postulationDto);
			const postulationToAccept: Postulation<PostulationStatus> = mapper.map();
			
			postulationToAccept.acceptPostulation(); 
			
			acceptedPostulationDto = { 
				id: postulationToAccept.ID.idPostulation,
				status: postulationToAccept.status,
			};
		} catch (e) {
			throw e;
		}
		
		return acceptedPostulationDto;
	}
}
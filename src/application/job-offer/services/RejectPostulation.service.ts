import IAplicationService from "src/application/shared/interfaces/IAplicationService";
import IDto from "src/application/shared/interfaces/IDto";
import { Postulation } from "src/domain/job-offer/entities/postulation";
import { PostulationStatus } from "src/domain/job-offer/value-objects/postulation/PostulationStatus";
import AcceptPostulationMapper from "../mappers/AcceptPostulationMapper";
import IUpdatePostulationStatusMapper from "../mappers/UpdatePostulationStatus.mapper";
import AcceptPostulationDto from "../ports/AcceptPostulationStatus.dto";
import RejectPostulationDto from "../ports/RejectPostulationStatus.dto";


export default class RejectedPostulationService implements IAplicationService {
	execute(postulationDto: RejectPostulationDto): RejectPostulationDto {
		let RejectedPostulationDto: RejectPostulationDto;

		try {
			
			const mapper: IUpdatePostulationStatusMapper = new AcceptPostulationMapper(postulationDto);
			const postulationToReject: Postulation<PostulationStatus> = mapper.map();
			
			postulationToReject.rejectPostulation(); 
			
			RejectedPostulationDto = { 
				id: postulationToReject.ID.idPostulation,
				status: postulationToReject.status,
				date:postulationToReject.getDate().date
			};
		} catch (e) {
			throw e;
		}
		
		return RejectedPostulationDto;
	}
}
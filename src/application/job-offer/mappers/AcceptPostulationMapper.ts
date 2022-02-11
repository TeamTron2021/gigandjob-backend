import { Postulation } from "src/domain/job-offer/entities/postulation";
import { PostulationDate } from "src/domain/job-offer/value-objects/postulation/PostulationDate";
import { PostulationStatus } from "src/domain/job-offer/value-objects/postulation/PostulationStatus";
import UpdatepostulationStatusMapper from "./UpdatePostulationStatus.mapper";

export default class AcceptpostulationMapper extends UpdatepostulationStatusMapper {
	
	map(): Postulation<PostulationStatus> {
		let postulation: Postulation<PostulationStatus>;
		
		try {
			postulation = Postulation.create(
				new PostulationDate(this.postulationDto.date),
			);
			postulation.setId(this.convertToPostulationUUID());
		} catch (e) {
			throw e;
		}
		
		return postulation;
	}
}
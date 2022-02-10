import { Postulation } from "src/domain/job-offer/entities/postulation";
import { PostulationStatus } from "src/domain/job-offer/value-objects/postulation/PostulationStatus";
import UpdatepostulationStatusMapper from "./UpdatePostulationStatus.mapper";

export default class RejectpostulationMapper extends UpdatepostulationStatusMapper {
	map(): Postulation<PostulationStatus> {
		let postulation: Postulation<PostulationStatus>;
		
		try {
			// postulation = new Postulation<PostulationStatus>(
			// 	//this.convertToPostulationUUID(),
			// 	//this.convertpostulationStatus()
			// );
		} catch (e) {
			throw e;
		}
		
		return postulation;
	}

}
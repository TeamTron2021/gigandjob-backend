import { PostulationStatus } from "src/domain/job-offer/value-objects/postulation/PostulationStatus";
import { PostulationUUID } from "src/domain/job-offer/value-objects/postulation/PostulationUUID";


export default interface IUpdatePostulationStatusMapper {
	convertToPostulationUUID(): PostulationUUID;
	
	convertpostulationStatus(): PostulationStatus;
}
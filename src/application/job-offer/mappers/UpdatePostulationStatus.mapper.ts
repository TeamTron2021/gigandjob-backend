import { Postulation } from "src/domain/job-offer/entities/postulation";
import AcceptPostulationDto from "../ports/AcceptPostulationStatus.dto";
import { PostulationStatus } from "src/domain/job-offer/value-objects/postulation/PostulationStatus";
import { PostulationUUID } from "src/domain/job-offer/value-objects/postulation/PostulationUUID";
import IPostulationwMapper from "./Ipostulation.mapper";


export default abstract class UpdatepostulationStatusMapper implements IPostulationwMapper {
	constructor(
        private readonly postulationDto: AcceptPostulationDto
	) {}

	public abstract map(): Postulation<PostulationStatus>;

	convertToPostulationUUID(): PostulationUUID {
		let postulationuuid: PostulationUUID;
		
		try {
			postulationuuid = PostulationUUID.create(this.postulationDto.id);
		} catch (e) {
			throw e;
		}
		
		return postulationuuid;
	}
	
	convertpostulationStatus(): PostulationStatus {
		switch (this.postulationDto.status) {
			case PostulationStatus.inProcess:
				return PostulationStatus.inProcess;

            case PostulationStatus.isSend:
                return PostulationStatus.isSend;
            
            case PostulationStatus.onReview:
                return PostulationStatus.onReview;
            
            case PostulationStatus.passed:
                return PostulationStatus.passed;
            
            case PostulationStatus.reject:
                return PostulationStatus.reject;
				
			
				
			/*
            default:
				throw new UnknownPostulationStatusException('El Estado de la postulación no existe: ' + this.PostulationStatus.status);
            */
		}
	}
}
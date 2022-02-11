import { Postulation } from "src/domain/job-offer/entities/postulation";
import { PostulationStatus } from "src/domain/job-offer/value-objects/postulation/PostulationStatus";


export default interface IPostulationwMapper {
	map(): Postulation<PostulationStatus>;
}
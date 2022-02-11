import IAplicationService from "src/application/shared/interfaces/IAplicationService";
import IPostulationRepository from "../repositories/postulation.repository";

export default abstract class IRejectPostulationHandler {
	public constructor(
		public readonly PostulationRepository: IPostulationRepository,
		public readonly acceptPostulationService: IAplicationService
	) {}
}
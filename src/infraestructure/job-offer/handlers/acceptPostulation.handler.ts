import { ICommandHandler } from "@nestjs/cqrs";
import { AcceptPostulationCommand } from "src/application/job-offer/commands/acceptPostulation.command";
import IAcceptPostulationHandler from "src/application/job-offer/handlers/AcceptPostulation.handler";
import AcceptPostulationDto from "src/application/job-offer/ports/AcceptPostulationStatus.dto";
import AcceptPostulationService from "src/application/job-offer/services/AcceptPostulation.service";
import PostulationRepository from "../repositories/postulationRepository.repository";

export class AcceptpostulationHandler extends IAcceptPostulationHandler implements ICommandHandler<AcceptPostulationCommand> {
	constructor(
		public readonly postulationRepository: PostulationRepository,
		public readonly acceptpostulationService: AcceptPostulationService,
	) {super(postulationRepository, acceptpostulationService)}
	
	execute(command: AcceptPostulationCommand): Promise<any> {
	
			const postulationUpdate: AcceptPostulationDto = this.acceptpostulationService.execute(command.Postulation);
			
			return this.postulationRepository.acceptpostulation(postulationUpdate);

		
	}
}
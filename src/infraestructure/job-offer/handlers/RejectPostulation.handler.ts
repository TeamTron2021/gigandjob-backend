import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RejectPostulationCommand } from "src/application/job-offer/commands/RejectPostulation.Command";
import IRejectPostulationHandler from "src/application/job-offer/handlers/RejectPostualtion.handler";
import RejectPostulationDto from "src/application/job-offer/ports/RejectPostulationStatus.dto";
import RejectPostulationService from "src/application/job-offer/services/RejectPostulation.service";
import PostulationRepository from "../repositories/postulationRepository.repository";

@CommandHandler(RejectPostulationCommand)

export class RejectpostulationHandler extends IRejectPostulationHandler implements ICommandHandler<RejectPostulationCommand> {
	constructor(
		public readonly postulationRepository: PostulationRepository,
		public readonly acceptpostulationService: RejectPostulationService,
	) {super(postulationRepository, acceptpostulationService)}
	
	execute(command: RejectPostulationCommand): Promise<any> {
		
			const postulationUpdate: RejectPostulationDto = this.acceptpostulationService.execute(command.Postulation);
			
			return this.postulationRepository.acceptpostulation(postulationUpdate);
		
	}
}
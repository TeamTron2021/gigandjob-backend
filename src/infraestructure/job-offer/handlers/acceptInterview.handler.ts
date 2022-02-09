import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import AcceptInterviewCommand from "../../../application/job-offer/commands/acceptInterview.command";
import {InterviewRepository} from "../repositories/InterviewRepository.repository";
import AcceptInterviewService from "../../../application/job-offer/services/acceptInterview.service";
import IAcceptInterviewHandler from "../../../application/job-offer/handlers/acceptInterview.handler";
import AcceptInterviewDto from "../../../application/job-offer/ports/acceptInterview.dto";

@CommandHandler(AcceptInterviewCommand)
/**
 * Maneja el comando para aceptar una entrevista.
 * */
export class AcceptInterviewHandler extends IAcceptInterviewHandler implements ICommandHandler<AcceptInterviewCommand> {
	constructor(
		public readonly interviewRepository: InterviewRepository,
		public readonly acceptInterviewService: AcceptInterviewService,
	) {super(interviewRepository, acceptInterviewService)}
	
	/**
	 * Ejecuta el comando para aceptar una entrevista.
	 *
	 * Usa el servicio de aplicación para ejecutar el comando. Luego, le indica, al repositorio de la entrevista,
	 * de actualizar la entrevista aceptada.
	 *
	 * @param command Comando para aceptar una entrevista.
	 *
	 * @return La entrevista aceptada.
	 *
	 * @throws UnknownInterviewStatusException
	 * @throws InterviewCurrentlyDisabledException
	 * */
	execute(command: AcceptInterviewCommand): Promise<any> {
		try {
			const interviewToUpdate: AcceptInterviewDto = this.acceptInterviewService.execute(command.interview);
			
			return this.interviewRepository.acceptInterview(interviewToUpdate);
		} catch (e) {
			console.error(e);
		}
	}
}
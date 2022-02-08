import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import AcceptInterviewCommand from "../../../application/job-offer/commands/acceptInterview.command";
import {InterviewRepository} from "../repositories/InterviewRepository.repository";

@CommandHandler(AcceptInterviewCommand)
/**
 * Maneja el comando para aceptar una entrevista.
 * */
export class AcceptInterviewHandler implements ICommandHandler<AcceptInterviewCommand> {
	constructor(
		public readonly interviewRepository: InterviewRepository,
		// public readonly
	) {}
	
	execute(command: AcceptInterviewCommand): Promise<any> {
		return Promise.resolve(undefined);
	}
}
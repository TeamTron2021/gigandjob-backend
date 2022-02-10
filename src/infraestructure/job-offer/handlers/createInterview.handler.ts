import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InterviewRepository } from '../repositories/InterviewRepository.repository';
import {CreateInterviewCommand} from "../../../application/job-offer/commands/createInterview.command";
import {PostulationStatus} from "../../../domain/job-offer/value-objects/postulation/PostulationStatus";

@CommandHandler(CreateInterviewCommand)
export class CreateInterviewHandler
  implements ICommandHandler<CreateInterviewCommand>
{
  constructor(private readonly interviewRepository: InterviewRepository) {}
  async execute(command: CreateInterviewCommand): Promise<void> {
    if (command.postulation.status === PostulationStatus.inProcess) {
      this.interviewRepository.createInterview(
        command.interview,
        command.postulation,
      );
      return;
    }
    throw new ConflictException(
      'La postulacion esta suspendida, por lo tanto no puede registrar entrevistas',
    );
  }
}

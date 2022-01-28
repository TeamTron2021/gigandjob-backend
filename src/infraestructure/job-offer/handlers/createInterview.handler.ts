import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInterviewCommand } from 'src/application/job-offer/commands/createInterview.command';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import { InterviewRepository } from '../repositories/InterviewRepository.repository';

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

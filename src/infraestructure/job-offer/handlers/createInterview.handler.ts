import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInterviewCommand } from 'src/application/job-offer/commands/createInterview.command';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import { InterviewRepository } from '../repositories/InterviewRepository.repository';

@CommandHandler(CreateInterviewCommand)
export class CreateInterviewHandler
  implements ICommandHandler<CreateInterviewCommand>
{
  constructor(private readonly interviewRepository: InterviewRepository) {}
  async execute(command: CreateInterviewCommand): Promise<void> {
    if (command.jobOffer.status === OfferStatus.published) {
      this.interviewRepository.createInterview(
        command.interview,
        command.jobOffer,
      );
      return;
    }
    throw new ConflictException(
      'La oferta esta suspendida, por lo tanto no puede registrar entrevistas',
    );
  }
}

import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobOfferCommand } from 'src/application/job-offer/commands/createJobOffer.command';
import { EmployeerStatus } from 'src/domain/employeer/shared/EmployeerStatus.enum';
import { JobOfferRepository } from '../repositories/JobOfferRepository.repository';

@CommandHandler(CreateJobOfferCommand)
export class CreateJobOfferHandler
  implements ICommandHandler<CreateJobOfferCommand>
{
  constructor(private readonly jobOfferRepository: JobOfferRepository) {}
  async execute(command: CreateJobOfferCommand): Promise<void> {
    if (command.employeer.status === EmployeerStatus.NOT_SUSPENDED) {
      this.jobOfferRepository.createJobOffer(
        command.jobOffer,
        command.employeer,
      );
      return;
    }
    throw new ConflictException(
      'El empleador esta suspendido, por lo tanto no puede crear ofertas',
    );
  }
}

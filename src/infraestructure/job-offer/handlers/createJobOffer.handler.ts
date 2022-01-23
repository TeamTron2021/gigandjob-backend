import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobOfferCommand } from 'src/application/job-offer/commands/createJobOffer.command';
import { JobOfferRepository } from '../repositories/JobOfferRepository.repository';

@CommandHandler(CreateJobOfferCommand)
export class CreateJobOfferHandler
  implements ICommandHandler<CreateJobOfferCommand>
{
  constructor(private readonly jobOfferRepository: JobOfferRepository) {}
  execute(command: CreateJobOfferCommand): Promise<void> {
    this.jobOfferRepository.createJobOffer(command.jobOffer);
    return;
  }
}

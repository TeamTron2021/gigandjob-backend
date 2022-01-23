import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobOfferCommand } from 'src/application/job-offer/commands/createJobOffer.command';

@CommandHandler(CreateJobOfferCommand)
export class CreateJobOfferHandler
  implements ICommandHandler<CreateJobOfferCommand>
{
  execute(command: CreateJobOfferCommand): Promise<void> {
    console.log(command);
    return;
  }
}

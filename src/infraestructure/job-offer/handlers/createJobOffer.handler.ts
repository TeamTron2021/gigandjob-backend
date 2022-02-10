import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateJobOfferCommand } from 'src/application/job-offer/commands/createJobOffer.command';
import ICreateJobOfferHandler from 'src/application/job-offer/handlers/createJobOffer.handler';
import JobOfferToSave from 'src/application/job-offer/ports/jobOfferToSave.dto';
import CreateJobOfferService from 'src/application/job-offer/services/createJobOffer.service';
import { EmployeerStatus } from 'src/domain/employeer/shared/EmployeerStatus.enum';
import { JobOfferRepository } from '../repositories/JobOfferRepository.repository';

@CommandHandler(CreateJobOfferCommand)
export class CreateJobOfferHandler
  extends ICreateJobOfferHandler
  implements ICommandHandler<CreateJobOfferCommand>
{
  constructor(
    readonly jobOfferRepository: JobOfferRepository,
    readonly createJobOfferService: CreateJobOfferService,
  ) {
    super(jobOfferRepository, createJobOfferService);
  }
  async execute(command: CreateJobOfferCommand): Promise<void> {
    const jobOfferTosave: JobOfferToSave = this.createJobOfferService.execute(
      command.jobOffer,
    );
    if (command.employeer.status === EmployeerStatus.NOT_SUSPENDED) {
      return this.jobOfferRepository.createJobOffer(
        jobOfferTosave,
        command.employeer,
      );
    }
    throw new ConflictException(
      'El empleador esta suspendido, por lo tanto no puede crear ofertas',
    );
  }
}

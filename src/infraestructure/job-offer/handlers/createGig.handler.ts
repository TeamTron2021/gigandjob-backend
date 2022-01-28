import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import CreateGigCommand from 'src/application/job-offer/commands/createGig.command';
import ICreateGigHandler from 'src/application/job-offer/handlers/createGig.handler';
import { EmployeerStatus } from 'src/domain/employeer/shared/EmployeerStatus.enum';
import GigRepository from '../repositories/gigRepository.repository';
@CommandHandler(CreateGigCommand)
export default class CreateGigHandler
  extends ICreateGigHandler
  implements ICommandHandler<CreateGigCommand>
{
  constructor(readonly gigRepository: GigRepository) {
    super(gigRepository);
  }
  async execute(command: CreateGigCommand): Promise<any> {
    if (command.employeer.status === EmployeerStatus.NOT_SUSPENDED) {
      this.gigRepository.createGig(command.gig, command.employeer);
      return;
    }
    throw new ConflictException(
      'El empleador esta suspendido, por lo tanto no puede crear ofertas',
    );
  }
}

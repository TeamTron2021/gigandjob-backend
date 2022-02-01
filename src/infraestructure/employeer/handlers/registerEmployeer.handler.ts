import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import IRegisterEmployeerHandler from 'src/application/employeer/handlers/registerEmployeer.handler';
import EmployeerToSaveDto from 'src/application/employeer/ports/employeerToSave.dto';
import RegisterEmployeerService from 'src/application/employeer/services/registerEmployeer.service';
import IDto from 'src/application/shared/interfaces/IDto';
import { RegisterEmployeerCommand } from '../../../application/employeer/commands/registerEmployeer.command';
import { EmployeerRepository } from '../repositories/Employeer.repository';

@CommandHandler(RegisterEmployeerCommand)
export class RegisterEmployeerHandler
  extends IRegisterEmployeerHandler
  implements ICommandHandler<RegisterEmployeerCommand>
{
  constructor(
    readonly employeerRepository: EmployeerRepository,
    private readonly eventPublisher: EventPublisher,
    readonly employeerService: RegisterEmployeerService,
  ) {
    super(employeerRepository, employeerService);
  }

  async execute(command: RegisterEmployeerCommand): Promise<void> {
    const employeer = this.employeerService.execute(command.employeer);
    return this.employeerRepository.createEmployeer(employeer);
  }
}

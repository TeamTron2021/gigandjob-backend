import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import IRegisterEmployeerHandler from 'src/application/employeer/handlers/registerEmployeer.handler';
import { RegisterEmployeerCommand } from '../../../application/employeer/commands/registerEmployeer.command';
import { EmployeerRepository } from '../repositories/EntityRepository.repository';

@CommandHandler(RegisterEmployeerCommand)
export class RegisterEmployeerHandler
  extends IRegisterEmployeerHandler
  implements ICommandHandler<RegisterEmployeerCommand>
{
  constructor(
    readonly employeerRepository: EmployeerRepository,
    private readonly eventPublisher: EventPublisher,
  ) {
    super(employeerRepository);
  }

  async execute(command: RegisterEmployeerCommand): Promise<void> {
    const employeer = this.eventPublisher.mergeObjectContext(
      await this.employeerRepository.createEmployeer(command.employeer),
    );
    employeer.commit();
  }
}

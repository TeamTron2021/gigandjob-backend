import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterEmployeerCommand } from '../../application/commands/registerEmployeer.command';
import { EmployeerRepository } from '../repositories/EntityRepository.repository';

@CommandHandler(RegisterEmployeerCommand)
export class RegisterEmployeerHandler
  implements ICommandHandler<RegisterEmployeerCommand>
{
  constructor(
    private readonly employeerRepository: EmployeerRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: RegisterEmployeerCommand): Promise<void> {
    const employeer = this.eventPublisher.mergeObjectContext(
      await this.employeerRepository.createEmployeer(command.employeer),
    );
    employeer.commit();
  }
}

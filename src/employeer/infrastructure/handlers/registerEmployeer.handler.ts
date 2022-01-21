import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterEmployeerCommand } from '../../application/commands/registerEmployeer.command';

@CommandHandler(RegisterEmployeerCommand)
export class RegisterEmployeerHandler
  implements ICommandHandler<RegisterEmployeerCommand>
{
  async execute(command: RegisterEmployeerCommand): Promise<void> {
    console.log(await command);
  }
}

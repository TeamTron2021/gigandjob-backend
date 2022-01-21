import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterEmployeerCommand } from '../../application/commands/registerEmployeer.command';

@Injectable()
export class EmployeerService {
  constructor(private readonly commandBus: CommandBus) {}
  createEmployeerService(data: any) {
    this.commandBus.execute(new RegisterEmployeerCommand(data.id, data.name));
  }
}

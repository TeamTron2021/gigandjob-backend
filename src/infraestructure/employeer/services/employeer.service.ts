import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterEmployeerCommand } from 'src/application/employeer/commands/registerEmployeer.command';
import FindEmployeerById from 'src/application/employeer/queries/findEmployeerById.query';
import FindEmployeersQuery from 'src/application/employeer/queries/findEmployeers.query';
import UniqueId from 'src/shared/domain/UniqueUUID';
import RegisterEmployeerMapper from '../mappers/registerEmployeer.mapper';
import { FindEmployeerByIdRequest } from '../request/findEmployeerById.request';
import RegisterEmployeerRequest from '../request/registerEmployeer.request';

// Servicio que maneja el CQRS dentro de la capa de infraestructura para el empleador
@Injectable()
export class EmployeerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  createEmployeerService(employeer: RegisterEmployeerRequest) {
    const employeerId: string = new UniqueId().getId(); //Genera el uuid necesario para registrar al empleador en la base de datos
    const employeerDto =
      RegisterEmployeerMapper.convertRegisterEmployeerRequestToDTO(
        employeerId,
        employeer,
      ); // extrae los datos del request y los transporta a un DTO
    return this.commandBus.execute(new RegisterEmployeerCommand(employeerDto));
  }

  async findEmployeerById(employeerId: FindEmployeerByIdRequest) {
    const employeer = this.queryBus.execute(
      new FindEmployeerById(employeerId.id),
    );
    return employeer;
  }
  async findEmployeers() {
    return await this.queryBus.execute(new FindEmployeersQuery());
  }
}

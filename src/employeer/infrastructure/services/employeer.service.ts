import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import UniqueId from 'src/shared/domain/UniqueUUID';
import RegisterEmployeerMapper from '../mappers/registerEmployeer.mapper';
import RegisterEmployeerRequest from '../request/registerEmployeer.request';

// Servicio que maneja el CQRS dentro de la capa de infraestructura para el empleador
@Injectable()
export class EmployeerService {
  constructor(private readonly commandBus: CommandBus) {}

  createEmployeerService(employeer: RegisterEmployeerRequest) {
    const employeerId: string = new UniqueId().getId(); //Genera el uuid necesario para registrar al empleador en la base de datos
    const employeerDto =
      RegisterEmployeerMapper.convertRegisterEmployeerRequestToDTO(
        employeerId,
        employeer,
      );
    console.log(employeerDto.industry);
  }
}

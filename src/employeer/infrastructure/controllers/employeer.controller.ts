import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import RegisterEmployeerRequest from '../request/registerEmployeer.request';
import { EmployeerService } from '../services/employeer.service';
import { ResponseDescription } from '../shared/enums/response-description.enum';

//Controlador para los endpoints de los empleadores
@Controller('employeer')
export class EmployeerController {
  constructor(private readonly employeerService: EmployeerService) {}

  //endpoint para registrar un empleador
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiResponse({
    status: 409,
    description: 'Parece que ese rif esta en uso',
  })
  @Post()
  async createEmployeer(@Body() employeer: RegisterEmployeerRequest) {
    return await this.employeerService.createEmployeerService(employeer);
  }
}

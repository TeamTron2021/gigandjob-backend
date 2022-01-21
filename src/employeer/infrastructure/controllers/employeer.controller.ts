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
  @Post()
  async createEmployeer(@Body() employeer: RegisterEmployeerRequest) {
    return this.employeerService.createEmployeerService(employeer);
  }
}

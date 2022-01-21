import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import RegisterEmployeerRequest from '../request/registerEmployeer.request';
import { EmployeerService } from '../services/employeer.service';
import { ResponseDescription } from '../shared/enums/response-description.enum';

@Controller('employeer')
export class EmployeerController {
  constructor(private readonly employeerService: EmployeerService) {}

  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @Post()
  async createEmployeer(@Body() data: RegisterEmployeerRequest) {
    return this.employeerService.createEmployeerService(data);
  }
}

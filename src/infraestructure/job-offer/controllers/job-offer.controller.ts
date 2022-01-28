import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FindEmployeerByIdRequest } from 'src/infraestructure/employeer/request/findEmployeerById.request';
import { ResponseDescription } from 'src/infraestructure/employeer/shared/enums/response-description.enum';
import CreateGigRequest from '../request/createGigRequest.request';
import CreateJobOfferRequest from '../request/createJobOfferRequest.request';
import { JobOfferService } from '../services/job-offer.service';

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiResponse({
    status: 404,
    description: 'No encontramos ningun empleador con ese id',
  })
  //endpoint para crear una oferta de trabajo
  @Post('/:id')
  async createJobOffer(
    @Body() offer: CreateJobOfferRequest,
    @Param() employeer: FindEmployeerByIdRequest,
  ) {
    return await this.jobOfferService.createJobOffer(offer, employeer);
  }

  //endpoint para crear un gig
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiResponse({
    status: 404,
    description: 'No encontramos ningun empleador con ese id',
  })
  @Post('/gig/:id')
  async createGig(
    @Body() offer: CreateGigRequest,
    @Param() employeer: FindEmployeerByIdRequest,
  ) {
    return await this.jobOfferService.createGig(offer, employeer);
  }
}

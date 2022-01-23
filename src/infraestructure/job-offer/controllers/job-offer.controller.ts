import { Body, Controller, Param, Post } from '@nestjs/common';
import { FindEmployeerByIdRequest } from 'src/infraestructure/employeer/request/findEmployeerById.request';
import CreateJobOfferRequest from '../request/createJobOfferRequest.request';
import { JobOfferService } from '../services/job-offer.service';

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}
  @Post('/:id')
  async createJobOffer(
    @Body() offer: CreateJobOfferRequest,
    @Param() employeer: FindEmployeerByIdRequest,
  ) {
    return await this.jobOfferService.createJobOffer(offer, employeer);
  }
}

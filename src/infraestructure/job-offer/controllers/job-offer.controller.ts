import { Body, Controller, Post } from '@nestjs/common';
import CreateJobOfferRequest from '../request/createJobOfferRequest.request';
import { JobOfferService } from '../services/job-offer.service';

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}
  @Post()
  async createJobOffer(@Body() offer: CreateJobOfferRequest) {
    return await this.jobOfferService.createJobOffer(offer);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import CreateJobOfferRequest from '../request/createJobOfferRequest.request';

@Controller('job-offer')
export class JobOfferController {
  @Post()
  async createJobOffer(@Body() offer: CreateJobOfferRequest) {
    console.log(offer);
  }
}

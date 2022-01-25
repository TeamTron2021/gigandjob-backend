import { Body, Controller, Param, Post } from '@nestjs/common';
import { FindEmployeerByIdRequest } from 'src/infraestructure/employeer/request/findEmployeerById.request';
import CreateJobOfferRequest from '../request/createJobOfferRequest.request';
import { JobOfferService } from '../services/interview.service';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}
  @Post('/:id')
  async createInterview(
    @Body() interview: CreateInterviewRequest,
    @Param() jobOffer: FindJobOfferByIdRequest,
  ) {
    return await this.interviewService.createInterview(interview, jobOffer);
  }
}

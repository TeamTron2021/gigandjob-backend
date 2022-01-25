import { Body, Controller, Param, Post } from '@nestjs/common';
import CreateInterviewRequest from '../request/createInterviewRequest.request';
import { FindJobOfferByIdRequest } from '../request/findJobOfferById.request';
import { InterviewService } from '../services/interview.service';

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

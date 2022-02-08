import { Body, Controller, HttpStatus, Param, Post, Get } from '@nestjs/common';
import CreateInterviewRequest from '../request/createInterviewRequest.request';
import { InterviewService } from '../services/interview.service';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseDescription } from 'src/infraestructure/employeer/shared/enums/response-description.enum';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';
import { FindInterviewByIdRequest } from '../request/findInterviewById.request';
import { buildResponse } from 'src/infraestructure/shared/buildResponse';


@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}
  
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiResponse({
    status: 404,
    description: 'No se encontro una entrevista con ese id',
  })
  
  @Post('/:id')
  async createInterview(
    @Body() interview: CreateInterviewRequest,
    @Param() postulation: FindPostulationByIdRequest,
  ) {
    return await this.interviewService.createInterview(interview, postulation);
  }

  //endpoint para buscar un empleador por su id
  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiResponse({
    status: 404,
    description: 'No encontramos ningun empleador con ese id',
  })
  @Get('/:id')
  async findInterview(@Param() interviewId: FindInterviewByIdRequest) {
    return await this.interviewService.findInterviewById(interviewId);
  }

  @Get()
  async findInterviews() {
    return buildResponse(
      HttpStatus.OK,
      await this.interviewService.findInterviews(),
    );
  }
}

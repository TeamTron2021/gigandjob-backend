import {Body, Controller, Param, Post, Get, Put} from '@nestjs/common';
import CreateInterviewRequest from '../request/createInterviewRequest.request';
import { InterviewService } from '../services/interview.service';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseDescription } from 'src/infraestructure/employeer/shared/enums/response-description.enum';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';
import { FindInterviewByIdRequest } from '../request/findInterviewById.request';


@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}
  
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiResponse({
    status: 404,
    description: 'No se encontro una postulacion con ese id',
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

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiResponse({
    status: 404,
    description: 'No hemos encontrado ninguna entrevista con ese ID.',
  })
  @Put('/:id')
  /**
   * Endpoint que permite aceptar una entrevista.
   *
   * Obtiene, de la solicitud, la entrevista a aceptar y le pide, al servicio de entrevista, actualizarla.
   *
   * @
   * */
  async acceptInterview(
      @Param() interviewId: FindInterviewByIdRequest
  ) {
    return await this.interviewService.acceptInterview(interviewId);
  }
}

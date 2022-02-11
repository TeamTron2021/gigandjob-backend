import {Body, Controller, Param, Post, Get, HttpStatus, Patch} from '@nestjs/common';
import CreateInterviewRequest from '../request/createInterviewRequest.request';
import { InterviewService } from '../services/interview.service';
import { ApiResponse } from '@nestjs/swagger';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';
import { FindInterviewByIdRequest } from '../request/findInterviewById.request';
import { FindInterviewByPostulationRequest } from '../request/findInterviewByPostulation.request';
import {ResponseDescription} from "../../employeer/shared/enums/response-description.enum";
import {buildResponse} from "../../shared/buildResponse";

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
  @Patch('/:id/accept') // ID de la entrevista.
  /**
   * Endpoint que permite aceptar una entrevista.
   *
   * Obtiene, de la solicitud, el ID de la entrevista a aceptar para, luego, delegar su actualización de estado
   * al servicio de entrevista (en infraestructura),
   *
   * @param interviewId ID de la entrevista a aceptar.
   *
   * @return Entrevista aceptada.
   * */
  async acceptInterview(
      @Param() interviewId: FindInterviewByIdRequest
  ) {
    return await this.interviewService.acceptInterview(interviewId);
  }

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @Get('/postulation/:postulationId')
  async findInterviewForPostualtion(@Param() postulationId: FindInterviewByPostulationRequest) {
    return buildResponse(
      HttpStatus.OK,
      await this.interviewService.findInterviewByPostulation(postulationId),
      );
  }
	
	@ApiResponse({ status: 200, description: ResponseDescription.OK })
	@ApiResponse({
		status: 404,
		description: 'No encontramos ninguna entrevista',
	})
	@Get('/interviews')
	/**
	 * Endpoint que retorna todas las entrevistas registradas.
	 *
	 * Delega, al servicio de entrevista, la búsqueda de todas las entrevistas.
	 *
	 * @return Todas las entrevistas.
	 * */
	async findInterviews(@Body() request: any) {
		return await this.interviewService.findInterviews()
		
	}
}

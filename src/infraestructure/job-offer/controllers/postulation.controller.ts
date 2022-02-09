import { ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Param, Get, Post, Put } from '@nestjs/common';
import { FindJobOfferByIdRequest } from 'src/infraestructure/employeer/request/findJobOfferByID.request';
import CreatePostulationRequest from '../request/createPostulationRequies.request';
import { PostulationService } from '../services/postulation.service';
import { ResponseDescription } from 'src/infraestructure/employeer/shared/enums/response-description.enum';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';

@Controller('postulation')
export class PostulationController {
  constructor(private readonly postulationService: PostulationService) {}
  @Post('/:id')
  async createPostulation(
    @Body() postulation: CreatePostulationRequest,
    @Param() jobOffer: FindJobOfferByIdRequest,
  ) {
    return await this.postulationService.createPostulation(
      postulation,
      jobOffer,
    );
  }

  //endpoint para buscar un empleador por su id
  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiResponse({
    status: 404,
    description: 'No encontramos ningun empleador con ese id',
  })
  @Get('/:id')
  async findPostulation(@Param() postulationId: FindPostulationByIdRequest) {
    return await this.postulationService.findPostulationById(postulationId);
  }
  @Get()
  async findPostulations() {
    return await this.postulationService.findPostulations();
  }

//Cambia el estado de la postulación a aceptada
  @Put('/:id') // ID de la postulación.
   
  async acceptPostulation(
      @Param() postulationId: FindPostulationByIdRequest
  ) {
    return await this.postulationService.acceptPostulation(postulationId);
  }
  //Cambia el estado de la postulación a Rechazada
  @Put('/:id') // ID de la postulación.
   
  async rejectPostulation(
      @Param() postulationId: FindPostulationByIdRequest
  ) {
    return await this.postulationService.rejectPostulation(postulationId);
  }
}

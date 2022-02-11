import { ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Param, Get, Post, HttpStatus } from '@nestjs/common';
import { FindJobOfferByIdRequest } from 'src/infraestructure/employeer/request/findJobOfferByID.request';
import CreatePostulationRequest from '../request/createPostulationRequies.request';
import { PostulationService } from '../services/postulation.service';
import { ResponseDescription } from 'src/infraestructure/employeer/shared/enums/response-description.enum';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';


import { buildResponse } from 'src/infraestructure/shared/buildResponse';

@Controller('postulation')
export class PostulationController {
  constructor(private readonly postulationService: PostulationService) {}

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiResponse({
    status: 404,
    description: 'No encontramos ninguna oferta con ese id',
  })
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
    description: 'No encontramos ninguna postulacion con ese id',
  })
  @Get('/:id')
  async findPostulation(@Param() postulationId: FindPostulationByIdRequest) {
    return await this.postulationService.findPostulationById(postulationId);
  }

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiResponse({
    status: 404,
    description: 'No encontramos postulaciones',
  })
  @Get()
  async findPostulations() {
    return buildResponse(
      HttpStatus.OK,
      await this.postulationService.findPostulations(),
      );
  }
}

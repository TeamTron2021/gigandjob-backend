import { ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Param, Get, Post } from '@nestjs/common';
import { FindJobOfferByIdRequest } from 'src/infraestructure/employeer/request/findJobOfferByID.request';
import CreatePostulationRequest from '../request/createPostulationRequies.request';
import { PostulationService } from '../services/postulation.service';
import { ResponseDescription } from 'src/infraestructure/employeer/shared/enums/response-description.enum';
import { FindPostulationByIdRequest } from '../request/findPostulationById.request';

@Controller('postulation')
export class PostulationController {
  constructor(private readonly postulationService: PostulationService) {}
  @Post()
  async createPostulation(
    @Body() postulation: CreatePostulationRequest,
    //@Param() jobOffer: FindJobOfferByIdRequest,
  ) {
    return await this.postulationService.createPostulation(postulation);
  }

  @ApiResponse({ status: 200, description: ResponseDescription.CREATED })
  @ApiResponse({
    status: 404,
    description: 'No se encontro ninguna postulacion',
  })
  // @Get('/:id')
  // async findPostulation(@Param() postulationId: FindPostulationByIdRequest) {
  //   return await this.postulationService.findPostulationById(postulationId);
  // }
  @Get()
  async findPostulations() {
    return await this.postulationService.findPostulations();
  }
}

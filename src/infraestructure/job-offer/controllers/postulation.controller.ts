import { Body, Controller, Param, Post } from '@nestjs/common';
import { FindJobOfferByIdRequest } from 'src/infraestructure/employeer/request/findJobOfferByID.request';
import CreatePostulationRequest from '../request/createPostulationRequies.request';
import { PostulationService } from '../services/postulation.service';

@Controller('postulation')
export class PostulationController {
  constructor(private readonly postulationService: PostulationService) {}
  @Post(':/id')
  async createPostulation(
    @Body() postulation: CreatePostulationRequest,
    @Param() jobOffer: FindJobOfferByIdRequest,
  ) {
    return await this.postulationService.createPostulation(
      postulation,
      jobOffer,
    );
  }
}

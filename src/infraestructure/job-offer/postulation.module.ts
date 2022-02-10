import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import FindJobOfferById from 'src/application/job-offer/queries/findJobOfferByID.query';
import CreatePostulationService from 'src/application/job-offer/services/createPostulation.service';
import { PostulationController } from './controllers/postulation.controller';
import { CreatePostulationHandler } from './handlers/createPostulation.handler';
import { findPostulationByIdHandler } from './handlers/findPostulationById.handler';
import { FindPostulationsHandler } from './handlers/findPostulations.handler';
import PostulationRepository from './repositories/postulationRepository.repository';
import { PostulationService } from './services/postulation.service';

@Module({
  imports: [CqrsModule, 
    TypeOrmModule.forFeature([
      PostulationRepository
  ])],
  controllers: [PostulationController],
  providers: [
    PostulationService,
    CreatePostulationHandler,
    findPostulationByIdHandler,
    FindPostulationsHandler,
    CreatePostulationService,
    FindJobOfferById,
  ],
})
export class PostulationModule {}

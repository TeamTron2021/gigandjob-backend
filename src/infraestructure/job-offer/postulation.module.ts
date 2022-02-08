import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import FindPostulationsQuery from 'src/application/job-offer/queries/findPostulation.query';
import CreatePostulationService from 'src/application/job-offer/services/createPostulation.service';
import { PostulationController } from './controllers/postulation.controller';
import { CreatePostulationHandler } from './handlers/createPostulation.handler';
import { findPostulationByIdHandler } from './handlers/findPostulationById.handler';
import PostulationRepository from './repositories/postulationRepository.repository';
import { PostulationService } from './services/postulation.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostulationRepository])],
  controllers: [PostulationController],
  providers: [
    PostulationService,
    CreatePostulationHandler,
    findPostulationByIdHandler,
    FindPostulationsQuery,
    CreatePostulationService,
  ],
})
export class PostulationModule {}

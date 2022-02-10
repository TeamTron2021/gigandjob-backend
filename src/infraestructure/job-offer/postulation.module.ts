import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostulationController } from './controllers/postulation.controller';
import { CreatePostulationHandler } from './handlers/createPostulation.handler';
import { findPostulationByIdHandler } from './handlers/findPostulationById.handler';
import { FindPostulationsHandler } from './handlers/findPostulations.handler';
import PostulationRepository from './repositories/postulationRepository.repository';
import { PostulationService } from './services/postulation.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostulationRepository])],
  controllers: [PostulationController],
  providers: [
    PostulationService,
    CreatePostulationHandler,
    findPostulationByIdHandler,
    FindPostulationsHandler,
  ],
})
export class PostulationModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreatePostulationService from 'src/application/job-offer/services/createPostulation.service';
import { UserRepository } from 'src/modules/user/user.repository';
import { PostulationController } from './controllers/postulation.controller';
import { CreatePostulationHandler } from './handlers/createPostulation.handler';
import findJobOfferByIDHandler from './handlers/findJobOfferById.handler';
import { findPostulationByIdHandler } from './handlers/findPostulationById.handler';
import { FindPostulationsHandler } from './handlers/findPostulations.handler';
import { JobOfferRepository } from './repositories/JobOfferRepository.repository';
import PostulationRepository from './repositories/postulationRepository.repository';
import { PostulationService } from './services/postulation.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      PostulationRepository,
      UserRepository,
      JobOfferRepository,
    ]),
  ],
  controllers: [PostulationController],
  providers: [
    PostulationService,
    CreatePostulationHandler,
    findPostulationByIdHandler,
    FindPostulationsHandler,
    CreatePostulationService,
    findJobOfferByIDHandler,
  ],
})
export class PostulationModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import AcceptPostulationService from 'src/application/job-offer/services/AcceptPostulation.service';
import RejectPostulationService from 'src/application/job-offer/services/RejectPostulation.service';
import RejectedPostulationService from 'src/application/job-offer/services/RejectPostulation.service';
import { PostulationController } from './controllers/postulation.controller';
import { AcceptpostulationHandler } from './handlers/acceptPostulation.handler';
import { CreatePostulationHandler } from './handlers/createPostulation.handler';
import { findPostulationByIdHandler } from './handlers/findPostulationById.handler';
import { RejectpostulationHandler } from './handlers/RejectPostulation.handler';
import PostulationRepository from './repositories/postulationRepository.repository';
import { PostulationService } from './services/postulation.service';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostulationRepository])],
  controllers: [PostulationController],
  providers: [
    PostulationService,
    CreatePostulationHandler,
    findPostulationByIdHandler,
    AcceptpostulationHandler,
    RejectpostulationHandler,
    AcceptPostulationService,
    RejectPostulationService
  ],
})
export class PostulationModule {}

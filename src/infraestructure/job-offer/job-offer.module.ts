import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOfferController } from './controllers/job-offer.controller';
import CreateGigHandler from './handlers/createGig.handler';
import { CreateJobOfferHandler } from './handlers/createJobOffer.handler';
import { GigORM } from './orm/gig.orm';
import { SkillsORM } from './orm/skills.orm';
import GigRepository from './repositories/gigRepository.repository';
import { JobOfferRepository } from './repositories/JobOfferRepository.repository';
import { JobOfferService } from './services/job-offer.service';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      JobOfferRepository,
      SkillsORM,
      GigORM,
      GigRepository,
    ]),
  ],
  controllers: [JobOfferController],
  providers: [JobOfferService, CreateJobOfferHandler, CreateGigHandler],
})
export class JobOfferModule {}

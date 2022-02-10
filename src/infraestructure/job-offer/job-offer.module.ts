import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreateGigService from 'src/application/job-offer/services/createGig.service';
import CreateJobOfferService from 'src/application/job-offer/services/createJobOffer.service';
import { AuthModule } from '../auth/auth.module';
import { JobOfferController } from './controllers/job-offer.controller';
import CreateGigHandler from './handlers/createGig.handler';
import { CreateJobOfferHandler } from './handlers/createJobOffer.handler';
import { FindJobOfferHandler } from './handlers/findJobOfferById.handler';
import { FindJobOffersHandler } from './handlers/findJobOffers.handler';
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
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [JobOfferController],
  providers: [
    JobOfferService,
    CreateJobOfferHandler,
    CreateGigHandler,
    CreateJobOfferService,
    CreateGigService,
    FindJobOffersHandler,
    FindJobOfferHandler,
  ],
})
export class JobOfferModule {}

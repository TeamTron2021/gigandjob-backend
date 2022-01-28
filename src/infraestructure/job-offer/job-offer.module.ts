import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOfferController } from './controllers/job-offer.controller';
import { CreateJobOfferHandler } from './handlers/createJobOffer.handler';
import { SkillsORM } from './orm/skills.orm';
import { JobOfferRepository } from './repositories/JobOfferRepository.repository';
import { JobOfferService } from './services/job-offer.service';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([JobOfferRepository, SkillsORM])],
    controllers: [JobOfferController],
    providers:[JobOfferService, CreateJobOfferHandler]
})
export class JobOfferModule {}

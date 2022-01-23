import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JobOfferController } from './controllers/job-offer.controller';
import { CreateJobOfferHandler } from './handlers/createJobOffer.handler';
import { JobOfferService } from './services/job-offer.service';

@Module({
    imports: [CqrsModule],
    controllers: [JobOfferController],
    providers:[JobOfferService, CreateJobOfferHandler]
})
export class JobOfferModule {}

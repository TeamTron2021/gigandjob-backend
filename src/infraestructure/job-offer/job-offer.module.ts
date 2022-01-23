import { Module } from '@nestjs/common';
import { JobOfferController } from './controllers/job-offer.controller';
import { JobOfferService } from './services/job-offer.service';

@Module({
    controllers: [JobOfferController],
    providers:[JobOfferService]
})
export class JobOfferModule {}

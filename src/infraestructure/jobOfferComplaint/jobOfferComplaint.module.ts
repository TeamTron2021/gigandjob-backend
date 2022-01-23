import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { JobOfferComplaintService } from 'src/aplication/JobOfferComplaint/jobOfferComplaint.service';

import { createJobOffercompalint } from './controller/jobOfferComplint.controller';
import { createjobOfferComplaintRepository } from './repository/jobOfferComplaintRepository';

@Module({
  imports:[CqrsModule,
           TypeOrmModule.forFeature([createjobOfferComplaintRepository])], 
  providers: [JobOfferComplaintService ],
  controllers: [createJobOffercompalint],
})
export class createjobofferComplaintModule {}
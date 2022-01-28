import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { createJobOffercompalintController } from './controller/jobOfferComplint.controller';
import { mappersComplaint } from 'src/application/JobOfferComplaint/mappers/mapperomplaint';
import { createjobOfferComplaintRepository } from './repository/jobOfferComplaintRepository';
import { JobOfferComplaintService } from '../../application/JobOfferComplaint/Service aplication/jobOfferComplaint.service';
import { JobOfferComplaintHandler } from 'src/application/JobOfferComplaint/Service aplication/jobOfferComplaint.handler';



@Module({
  imports:[CqrsModule, 
           TypeOrmModule.forFeature([createjobOfferComplaintRepository])], 
  providers: [JobOfferComplaintHandler, mappersComplaint,JobOfferComplaintService],
  controllers: [createJobOffercompalintController],
})
export class createjobofferComplaintModule {}
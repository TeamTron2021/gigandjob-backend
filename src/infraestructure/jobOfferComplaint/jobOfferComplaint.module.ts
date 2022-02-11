import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { createJobOffercompalintController } from './controller/jobOfferComplint.controller';
import { mappersComplaint } from '../../application/JobOfferComplaint/mappers/mapperComplaint';
import { createjobOfferComplaintRepository } from './repository/jobOfferComplaintRepository';
import { JobOfferComplaintService } from '../../application/JobOfferComplaint/Service/jobOfferComplaint.service';
import { AcceptComplaintHandler } from '../../application/JobOfferComplaint/handler/aceptComplaint.handler';
import { rejectComplaintHandler } from '../../application/JobOfferComplaint/handler/rejectComplaint.handler';
import { JobOfferComplaintHandler } from '../../application/JobOfferComplaint/handler/CreateComplaint.handler';

@Module({
  imports:[CqrsModule, 
           TypeOrmModule.forFeature([createjobOfferComplaintRepository])], 
  providers: [JobOfferComplaintHandler, mappersComplaint,JobOfferComplaintService, AcceptComplaintHandler, rejectComplaintHandler],
  controllers: [createJobOffercompalintController],
})
export class createjobofferComplaintModule {}
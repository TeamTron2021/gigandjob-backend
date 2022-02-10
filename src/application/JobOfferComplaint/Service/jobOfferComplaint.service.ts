import { Injectable } from "@nestjs/common";
import { InjectRepository} from "@nestjs/typeorm";
import { mappersComplaint } from "../../../application/JobOfferComplaint/mappers/mapperComplaint";
import { IjobOfferComplaintRepository } from "../../../application/JobOfferComplaint/out/IcomplaintRepository";
import { JobOfferComplaint } from "../../../domain/job-offer/entities/JobOfferComplaint";
import JobOfferId from "../../../domain/job-offer/value-objects/JobOffer/JobOfferId";
import { createjobOfferComplaintRepository } from "../../../infraestructure/jobOfferComplaint/repository/jobOfferComplaintRepository";


Injectable()
export class JobOfferComplaintService{
    constructor(
      @InjectRepository(createjobOfferComplaintRepository)
      private readonly _jobOfferPersistence: IjobOfferComplaintRepository,
      private readonly _jobOffermapper: mappersComplaint, 
    ) {}
    
    async createjobOfferComplaint(complaint:  JobOfferComplaint, idJobOffer: JobOfferId): Promise<any> {
        const JobOfferComplaint = this._jobOffermapper.convertDomainToDto(complaint);
        const JobOfferId = this._jobOffermapper.convertDomainToDtoCreateJobOffferid(idJobOffer);
        
        return await this._jobOfferPersistence.createjobOfferComplaint(JobOfferComplaint, JobOfferId);
    }

    async updatejobOfferComplaint(complaint:  JobOfferComplaint): Promise<any> {
      const JobOfferComplaint = this._jobOffermapper.convertDomainToDto(complaint);
      return await this._jobOfferPersistence.UpdateAceptedobOfferComplaint(JobOfferComplaint);
  }

}
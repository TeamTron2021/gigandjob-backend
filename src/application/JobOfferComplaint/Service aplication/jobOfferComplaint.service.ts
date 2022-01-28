import { Injectable } from "@nestjs/common";
import { InjectRepository} from "@nestjs/typeorm";
import { mappersComplaint } from "src/application/JobOfferComplaint/mappers/mapperomplaint";
import { IjobOfferComplaintRepository } from "src/application/JobOfferComplaint/out/IcomplaintRepository";
import { JobOfferComplaint } from "src/domain/job-offer/entities/JobOfferComplaint";
import { createjobOfferComplaintRepository } from "../../../infraestructure/jobOfferComplaint/repository/jobOfferComplaintRepository";


Injectable()
export class JobOfferComplaintService{
    constructor(
      @InjectRepository(createjobOfferComplaintRepository)
      private readonly _jobOfferPersistence: IjobOfferComplaintRepository,
      private readonly _jobOffermapper: mappersComplaint, 
    ) {}
    
    async createjobOfferComplaint(complaint:  JobOfferComplaint): Promise<any> {
        const test = this._jobOffermapper.converttoJobofferComplaintDto(complaint);
        return await this._jobOfferPersistence.createjobOfferComplaint(test);
    }
}
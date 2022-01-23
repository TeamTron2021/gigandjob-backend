import CreateJobOfferDto from 'src/application/job-offer/ports/createJobOffer.dto';
import createJobOfferDto from 'src/application/job-offer/ports/createJobOffer.dto';
import IJobOfferRepository from 'src/application/job-offer/repositories/job-offer.repository';
import JobOfferAggregate from 'src/domain/job-offer/entities/JobOffer.aggregate';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { JobOfferMapper } from '../mappers/jobOffer.mapper';
import { JobOfferORM } from '../orm/job-offer.orm';
import { SkillsORM } from '../orm/skills.orm';

@EntityRepository(JobOfferORM)
export class JobOfferRepository extends Repository<JobOfferORM> {
  async createJobOffer(jobOfferDto: CreateJobOfferDto): Promise<void> {
    const jobOfferSave = new JobOfferORM();
    const skillsToSave = JobOfferMapper.convertToSkillsORM(jobOfferDto.skills);
    jobOfferSave.description = jobOfferDto.description;
    jobOfferSave.salary = jobOfferDto.salary;
    jobOfferSave.finalDate = jobOfferDto.finalDate;
    jobOfferSave.id = jobOfferDto.id;
    jobOfferSave.title = jobOfferDto.title;
    jobOfferSave.vacants = jobOfferDto.vacant;
    jobOfferSave.startDate = jobOfferDto.startDate;
    jobOfferSave.description = jobOfferDto.description;
    jobOfferSave.status = OfferStatus.notPublished;
    await this.save(jobOfferSave);
    const skillsORM = getRepository(SkillsORM);
    skillsToSave.forEach(async (element) => {
      element.jobOffer = jobOfferSave;
      await skillsORM.save(element);
    });
  }
}

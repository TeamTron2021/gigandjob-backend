import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateJobOfferDto from 'src/application/job-offer/ports/createJobOffer.dto';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import { EmployeerORM } from 'src/infraestructure/employeer/orm/employeer.orm';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { JobOfferMapper } from '../mappers/jobOffer.mapper';
import { JobOfferORM } from '../orm/job-offer.orm';
import { SkillsORM } from '../orm/skills.orm';

@EntityRepository(JobOfferORM)
export class JobOfferRepository extends Repository<JobOfferORM> {
  async createJobOffer(
    jobOfferDto: CreateJobOfferDto,
    employeer: EmployeerFound,
  ): Promise<void> {
    const jobOfferSave = new JobOfferORM();
    const employeerToAdd: EmployeerORM = {
      ...employeer,
      jobOffers: [],
    };
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
    jobOfferSave.employeer = employeerToAdd;
    await this.save(jobOfferSave);
    const skillsORM = getRepository(SkillsORM);
    skillsToSave.forEach(async (element) => {
      element.jobOffer = jobOfferSave;
      await skillsORM.save(element);
    });
  }
}

import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateJobOfferDto from 'src/application/job-offer/ports/createJobOffer.dto';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import JobOfferToSave from 'src/application/job-offer/ports/jobOfferToSave.dto';
import IJobOfferRepository from 'src/application/job-offer/repositories/job-offer.repository';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import { EmployeerORM } from 'src/infraestructure/employeer/orm/employeer.orm';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { JobOfferMapper } from '../mappers/jobOffer.mapper';
import { JobOfferORM } from '../orm/job-offer.orm';
import { SkillsORM } from '../orm/skills.orm';

@EntityRepository(JobOfferORM)
export class JobOfferRepository
  extends Repository<JobOfferORM>
  implements IJobOfferRepository
{
  async createJobOffer(
    jobOfferDto: JobOfferToSave,
    employeer: EmployeerFound,
  ): Promise<void> {
    const employeerOrm: EmployeerORM = {
      ...employeer,
      jobOffers: [],
      gigs: [],
    };
    const {
      id,
      description,
      salary,
      skills,
      title,
      vacant,
      startDate,
      finalDate,
      status,
    } = jobOfferDto;
    const skillsToSave = JobOfferMapper.convertToSkillsORM(skills);
    const newJobOffer: JobOfferORM = {
      id,
      description,
      salary,
      title,
      vacants: vacant,
      startDate,
      finalDate,
      status,
      skills: skillsToSave,
      employeer: employeerOrm,
    };
    await this.save(newJobOffer);
    const skillsORM = getRepository(SkillsORM);
    skillsToSave.forEach(async (element) => {
      element.jobOffer = newJobOffer;
      await skillsORM.save(element);
    });
    return;
  }
}

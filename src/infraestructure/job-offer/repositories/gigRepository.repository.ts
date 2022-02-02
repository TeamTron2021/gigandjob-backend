import findEmployeerResultDto from 'src/application/employeer/ports/findEmployeerResult.dto';
import createGigDto from 'src/application/job-offer/ports/createGig.dto';
import GigToSave from 'src/application/job-offer/ports/gigToSave.dto';
import { OfferStatus } from 'src/domain/job-offer/shared/OfferStatus.enum';
import { EmployeerORM } from 'src/infraestructure/employeer/orm/employeer.orm';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import IGigRepository from '../../../application/job-offer/repositories/gig.repository';
import { JobOfferMapper } from '../mappers/jobOffer.mapper';
import { GigORM } from '../orm/gig.orm';
import { SkillsORM } from '../orm/skills.orm';
@EntityRepository(GigORM)
export default class GigRepository
  extends Repository<GigORM>
  implements IGigRepository
{
  async createGig(createGigDto: GigToSave, employeer: findEmployeerResultDto) {
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
      time,
      amount,
    } = createGigDto;
    const skillsToSave = JobOfferMapper.convertToSkillsORM(skills);
    const newGig: GigORM = {
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
      time,
      amount,
    };
    await this.save(newGig);
    const skillsORM = getRepository(SkillsORM);
    skillsToSave.forEach(async (element) => {
      element.gig = newGig;
      await skillsORM.save(element);
    });
    return;
  }
}

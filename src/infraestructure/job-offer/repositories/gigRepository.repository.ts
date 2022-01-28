import findEmployeerResultDto from 'src/application/employeer/ports/findEmployeerResult.dto';
import createGigDto from 'src/application/job-offer/ports/createGig.dto';
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
  async createGig(
    createGigDto: createGigDto,
    employeer: findEmployeerResultDto,
  ) {
    const employeerToAdd: EmployeerORM = {
      ...employeer,
      jobOffers: [],
      gigs: [],
    };
    const skillsToSave = JobOfferMapper.convertToSkillsORM(createGigDto.skills);
    const gigToSave = new GigORM();
    gigToSave.description = createGigDto.description;
    gigToSave.salary = createGigDto.salary;
    gigToSave.finalDate = createGigDto.finalDate;
    gigToSave.id = createGigDto.id;
    gigToSave.title = createGigDto.title;
    gigToSave.vacants = createGigDto.vacant;
    gigToSave.startDate = createGigDto.startDate;
    gigToSave.description = createGigDto.description;
    gigToSave.status = OfferStatus.notPublished;
    gigToSave.amount = createGigDto.amount;
    gigToSave.time = createGigDto.time;
    await this.save(gigToSave);
    const skillsORM = getRepository(SkillsORM);
    skillsToSave.forEach(async (element) => {
      element.gig = gigToSave;
      await skillsORM.save(element);
    });
    gigToSave.employeer = employeerToAdd;
    return;
  }
}

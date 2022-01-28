import { CreateSkillsDto } from 'src/application/job-offer/ports/createSkills.dto';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import UniqueId from 'src/shared/domain/UniqueUUID';
import { JobOfferORM } from '../orm/job-offer.orm';
import { SkillsORM } from '../orm/skills.orm';

export class JobOfferMapper {
  public static convertToSkillsORM(skills: CreateSkillsDto[]): SkillsORM[] {
    return skills.map((element) => {
      const skill = new SkillsORM();
      skill.id = new UniqueId().getId();
      skill.skill = element.skill;
      return skill;
    });
  }
  public static convertToJobOfferFound(jobOffer: JobOfferORM): JobOfferFound {
    const newJobOffer: JobOfferFound = {
      ...jobOffer,
      vacant: jobOffer.vacants,
    };
    return newJobOffer;
  }
}

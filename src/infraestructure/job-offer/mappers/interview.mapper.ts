import { CreateSkillsDto } from 'src/application/job-offer/ports/createSkills.dto';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import UniqueId from 'src/shared/domain/UniqueUUID';
import { JobOfferORM } from '../orm/job-offer.orm';
import { SkillsORM } from '../orm/skills.orm';

export class InterviewMapper {
  public static convertToInterviewFound(interview: InterviewORM): InterviewFound {
    const newJobOffer: JobOfferFound = {
      ...jobOffer,
      vacant: jobOffer.vacants,
    };
    return newJobOffer;
  }
}

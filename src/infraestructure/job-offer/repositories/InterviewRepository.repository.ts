
import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateInterviewDto from 'src/application/job-offer/ports/createInterview.dto';
import InterviewFound from 'src/application/job-offer/ports/interviewFound.dto';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import IInterviewRepository from 'src/application/job-offer/repositories/interview.repository';
import { InterviewStatus } from 'src/domain/job-offer/shared/InterviewStatus.enum';
import { EmployeerORM } from 'src/infraestructure/employeer/orm/employeer.orm';
import { UserORM } from 'src/infraestructure/user/orm/user.orm';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { InterviewMapper } from '../mappers/interview.mapper';
import { JobOfferMapper } from '../mappers/jobOffer.mapper';
import { InterviewORM } from '../orm/interview.orm';
import { JobOfferORM } from '../orm/job-offer.orm';

@EntityRepository(InterviewORM)
export class InterviewRepository
  extends Repository<InterviewORM>
  implements IInterviewRepository
{
  async createInterview(
    interviewDto: CreateInterviewDto,
    jobOffer: JobOfferFound,
  ): Promise<InterviewFound> {
    const interviewSave = new InterviewORM();
    /*const jobOfferToAdd: JobOfferORM = {
      ...jobOffer,
      interviews: [],
    };
    const userToAdd: UserORM = {
      ...jobOffer,
      interviews: [],
    };
*/
    interviewSave.id = interviewDto.id;
    interviewSave.title = interviewDto.title;
    interviewSave.description = interviewDto.description;
    interviewSave.date = interviewDto.date;
   /* interviewSave.interviewed = userToAdd;
    interviewSave.jobOffer = jobOfferToAdd;*/
    interviewSave.status = InterviewStatus.created;

    await this.save(interviewSave);
   
    return InterviewMapper.convertToInterviewFound(interviewSave);
  }
}

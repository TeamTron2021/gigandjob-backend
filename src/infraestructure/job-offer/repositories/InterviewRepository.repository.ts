
import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import CreateInterviewDto from 'src/application/job-offer/ports/createInterview.dto';
import InterviewFound from 'src/application/job-offer/ports/interviewFound.dto';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import IInterviewRepository from 'src/application/job-offer/repositories/interview.repository';
import { InterviewStatus } from 'src/domain/job-offer/shared/InterviewStatus.enum';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { InterviewMapper } from '../mappers/interview.mapper';
import { InterviewORM } from '../orm/interview.orm';
import PostulationOrm from '../orm/postulation.orm';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(InterviewORM)
export class InterviewRepository
  extends Repository<InterviewORM>
  implements IInterviewRepository
{
  async createInterview(
    interviewDto: CreateInterviewDto,
    postulation: PostulationFound,
  ): Promise<InterviewFound> {
    const interviewSave = new InterviewORM();
    const postulationToAdd: PostulationOrm = {
      ...postulation,
      interviews: [],
    };
    
    interviewSave.id = interviewDto.id;
    interviewSave.title = interviewDto.title;
    interviewSave.description = interviewDto.description;
    interviewSave.date = interviewDto.date;
    interviewSave.postulation = postulationToAdd;
    interviewSave.status = InterviewStatus.created;

    await this.save(interviewSave);
   
    return InterviewMapper.convertToInterviewFound(interviewSave);
  }

  async findById(id: string): Promise<InterviewFound> {
    const interview: InterviewORM = await this.findOne(id);
    if (interview != null) {
      const result: InterviewFound = {
        ...interview,
      };
      return result;
    }
    throw new NotFoundException('No encontramos ninguna oferta con ese id');
  }

  async findByPostulation(postulationId: string): Promise<InterviewFound[]> {
    const interview: InterviewORM[] = await this.find({ where: { postulation: postulationId } });
    if (interview != null) {
      const result: InterviewFound[] = {
        ...interview,
      };
      return result;
    }
    throw new NotFoundException('No encontramos ninguna entrevista para su postulacion');
  }
  
}

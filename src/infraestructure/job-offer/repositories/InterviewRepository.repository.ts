import { EntityRepository, Repository } from 'typeorm';
import { InterviewMapper } from '../mappers/interview.mapper';
import { InterviewORM } from '../orm/interview.orm';
import PostulationOrm from '../orm/postulation.orm';
import { NotFoundException } from '@nestjs/common';
import AcceptInterviewDto from "../../../application/job-offer/ports/acceptInterview.dto";
import InterviewFound from "../../../application/job-offer/ports/interviewFound.dto";
import {InterviewStatus} from "../../../domain/job-offer/shared/InterviewStatus.enum";
import PostulationFound from "../../../application/job-offer/ports/findPostulationResult.dto";
import CreateInterviewDto from "../../../application/job-offer/ports/createInterview.dto";
import IInterviewRepository from "../../../application/job-offer/repositories/interview.repository";
import RegisterInterviewMapper from '../mappers/registerInterview.mapper';

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
      jobOffer: null
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
	
	/**
	 * Actualiza el estado de la entrevista aceptada.
	 *
	 * @param acceptedInterview Entrevista aceptada.
	 * */
	async acceptInterview(acceptedInterview: AcceptInterviewDto): Promise<InterviewFound> {
		await this.update(acceptedInterview.id, {
			status: acceptedInterview.status
		});
		
		return this.findById(acceptedInterview.id);
	}

  async findByPostulation(postulationId: string): Promise<InterviewFound[]> {
    const interview: InterviewORM[] = await this.find({ where: { postulation: postulationId } });
    if (interview != null) {
      const result: InterviewFound[] = RegisterInterviewMapper.convertManyInterviewsToFound(interview);
     
      return result;
    }
    throw new NotFoundException('No encontramos ninguna entrevista para su postulacion');
  }
  
}

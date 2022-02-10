import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import EmployeerDto from 'src/application/employeer/ports/employeer.dto';
import createPostulationDto from 'src/application/job-offer/ports/createPostulation.dto';
import { CreateSkillsDto } from 'src/application/job-offer/ports/createSkills.dto';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import postulationFoundDto from 'src/application/job-offer/ports/findPostulationResult.dto';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import PostulationToSave from 'src/application/job-offer/ports/postulationToSave.dto';
import IPostulationRepository from 'src/application/job-offer/repositories/postulation.repository';
import { UserDto } from 'src/application/user/User.dto';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import { EmployeerORM } from 'src/infraestructure/employeer/orm/employeer.orm';
import { EntityRepository, Repository } from 'typeorm';
import CreatePostulationMapper from '../mappers/createPostulation.mapper';
import PostulationMapper from '../mappers/createPostulation.mapper';
import { JobOfferMapper } from '../mappers/jobOffer.mapper';
import { GigORM } from '../orm/gig.orm';
import { JobOfferORM } from '../orm/job-offer.orm';
import PostulationOrm from '../orm/postulation.orm';
import { SkillsORM } from '../orm/skills.orm';
import { JobOfferRepository } from './JobOfferRepository.repository';

@EntityRepository(PostulationOrm)
export default class PostulationRepository
  extends Repository<PostulationOrm>
  implements IPostulationRepository
{
  constructor(private readonly _jobOffer: JobOfferRepository) {
    super();
  }

  async findPostulations(): Promise<PostulationFound[]> {
    try {
      const postulations = await this.find();
      const result: PostulationFound[] =
        CreatePostulationMapper.convertPostulationsToFound(postulations);
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createPostulation(
    postulationDTO: PostulationToSave,
    jobOffer: JobOfferFound,
    user: UserDto,
  ): Promise<void> {
    const newPostulationSave = new PostulationOrm();
    // const addInterview: InterviewOrm = {

    // }
    newPostulationSave.id = postulationDTO.id;
    newPostulationSave.date = postulationDTO.date;
    newPostulationSave.status = PostulationStatus.isSend;
    newPostulationSave.jobOffer = jobOfferReturnORM;
    newPostulationSave.user = user.ID;

    try {
      await this.save(newPostulationSave);
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException('');
      }
    }
  }

  async findById(id: string): Promise<PostulationFound> {
    const postulation: PostulationOrm = await this.findOne(id);
    if (postulation != null) {
      const result: PostulationFound = {
        ...postulation,
      };
      return result;
    }
    throw new NotFoundException(
      'No encontramos ninguna postulacion con ese id',
    );
  }
}

import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import createPostulationDto from 'src/application/job-offer/ports/createPostulation.dto';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import postulationFoundDto from 'src/application/job-offer/ports/findPostulationResult.dto';
import JobOfferFound from 'src/application/job-offer/ports/jobOfferFound.dto';
import PostulationToSave from 'src/application/job-offer/ports/postulationToSave.dto';
import IPostulationRepository from 'src/application/job-offer/repositories/postulation.repository';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import { EntityRepository, Repository } from 'typeorm';
import PostulationMapper from '../mappers/postulation.mapper';
import RegisterPostulationMapper from '../mappers/registerPostulation.mapper';
import { JobOfferORM } from '../orm/job-offer.orm';
import PostulationOrm from '../orm/postulation.orm';

@EntityRepository(PostulationOrm)
export default class PostulationRepository
  extends Repository<PostulationOrm>
  implements IPostulationRepository
{
  async createPostulation(
    postulationDto: PostulationToSave,
    jobOffer: JobOfferFound,
  ): Promise<void> {
   
    const {
      id,
      date,
      status,
    } = postulationDto;

    const jobOfferOrm: JobOfferORM = {
      ...jobOffer,
      skills: [],
      employeer: null,
      vacants : 0
    };
    
    const newPostulation: PostulationOrm = {
      id,
      date,
      status,
      interviews:[],
      jobOffer: jobOfferOrm
    };
    await this.save(newPostulation);
    
    return;
  }

  async findById(id: string): Promise<PostulationFound> {
    const postulation: PostulationOrm = await this.findOne(id);
    if (postulation != null) {
      const result: PostulationFound = {
        ...postulation,
      };
      return result;
    }
    throw new NotFoundException('No encontramos ninguna oferta con ese id');
  }

  async findPostulations(): Promise<PostulationFound[]> {
    try {
      const postulations = await this.find();
      const result: PostulationFound[] =
        RegisterPostulationMapper.convertManyPostulationsToFound(postulations);
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}

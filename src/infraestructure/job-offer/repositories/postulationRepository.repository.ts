import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import createPostulationDto from 'src/application/job-offer/ports/createPostulation.dto';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import postulationFoundDto from 'src/application/job-offer/ports/findPostulationResult.dto';
import PostulationToSave from 'src/application/job-offer/ports/postulationToSave.dto';
import IPostulationRepository from 'src/application/job-offer/repositories/postulation.repository';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import { EntityRepository, Repository } from 'typeorm';
import CreatePostulationMapper from '../mappers/createPostulation.mapper';
import PostulationMapper from '../mappers/createPostulation.mapper';
import PostulationOrm from '../orm/postulation.orm';

@EntityRepository(PostulationOrm)
export default class PostulationRepository
  extends Repository<PostulationOrm>
  implements IPostulationRepository
{
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

  async createPostulation(postulationDTO: PostulationToSave): Promise<void> {
    const newPostulationSave = new PostulationOrm();
    newPostulationSave.id = postulationDTO.id;
    newPostulationSave.date = postulationDTO.date;
    newPostulationSave.status = PostulationStatus.isSend;

    try {
      await this.save(newPostulationSave);
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException('');
      }
      throw new InternalServerErrorException();
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

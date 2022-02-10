import { NotFoundException } from '@nestjs/common';
import AcceptPostulationStatusDto from 'src/application/job-offer/ports/AcceptPostulationStatus.dto';
import createPostulationDto from 'src/application/job-offer/ports/createPostulation.dto';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import postulationFoundDto from 'src/application/job-offer/ports/findPostulationResult.dto';
import IPostulationRepository from 'src/application/job-offer/repositories/postulation.repository';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import { EntityRepository, Repository } from 'typeorm';
import PostulationMapper from '../mappers/postulation.mapper';
import PostulationOrm from '../orm/postulation.orm';

@EntityRepository(PostulationOrm)
export default class PostulationRepository
  extends Repository<PostulationOrm>
  implements IPostulationRepository
{
  acceptpostulation(postulationUpdate: AcceptPostulationStatusDto): Promise<any> {
      throw new Error("Method not implemented.");
  }
  async createPostulation(
    postulationDTO: createPostulationDto,
  ): Promise<postulationFoundDto> {
    const newPostulationSave = new PostulationOrm();
    // const addInterview: InterviewOrm = {

    // }
    newPostulationSave.id = postulationDTO.id;
    newPostulationSave.date = postulationDTO.date;
    newPostulationSave.status = PostulationStatus.isSend;
    await this.save(newPostulationSave);
    return PostulationMapper.toPostulationFound(newPostulationSave);
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
}

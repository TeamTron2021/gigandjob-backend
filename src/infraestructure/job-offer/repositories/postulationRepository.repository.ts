import createPostulationDto from 'src/application/job-offer/ports/createPostulation.dto';
import postulationFoundDto from 'src/application/job-offer/ports/postulationFound.dto';
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
}

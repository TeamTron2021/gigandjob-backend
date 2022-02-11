import { NotFoundException } from '@nestjs/common';
import AcceptPostulationStatusDto from 'src/application/job-offer/ports/AcceptPostulationStatus.dto';
import createPostulationDto from 'src/application/job-offer/ports/createPostulation.dto';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import postulationFoundDto from 'src/application/job-offer/ports/findPostulationResult.dto';
import RejectPostulationStatusDto from 'src/application/job-offer/ports/RejectPostulationStatus.dto';
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
  async findPostulations(): Promise<PostulationFound[]> {
    const postulations = await this.find();
    const postulationsToSend: PostulationFound[] = postulations.map(
      (postulation) => {
        const sendPostulation: PostulationFound = {
          ...postulation,
        };
        return sendPostulation;
      },
    );
    return postulationsToSend;
  }

  async acceptpostulation(
    postulationUpdate: AcceptPostulationStatusDto,
  ): Promise<void> {
    console.log(postulationUpdate.status);
    await this.update(postulationUpdate.id, {
      status: postulationUpdate.status,
    });
  }
  async Rejectpostulation(
    postulationUpdate: RejectPostulationStatusDto,
  ): Promise<void> {
    console.log(postulationUpdate.status);
    await this.update(postulationUpdate.id, {
      status: postulationUpdate.status,
    });
  }
  async createPostulation(
    postulationDTO: createPostulationDto,
    jobOffer: string,
  ): Promise<postulationFoundDto> {
    const newPostulationSave = new PostulationOrm();
    // const addInterview: InterviewOrm = {

    // }
    newPostulationSave.id = postulationDTO.id;
    newPostulationSave.date = postulationDTO.date;
    newPostulationSave.status = PostulationStatus.isSend;
    newPostulationSave.jobOfferId = jobOffer;
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

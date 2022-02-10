import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import { Postulation } from 'src/domain/job-offer/entities/postulation';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import CreatePostulationMapper from '../mappers/createPostulationMapper';
import CreatePostulationDto from '../ports/createPostulation.dto';
import { CreateSkillsDto } from '../ports/createSkills.dto';
import PostulationToSave from '../ports/postulationToSave.dto';

export default class CreatePostulationService implements IAplicationService {
  execute(postulationDto: CreatePostulationDto): PostulationToSave {
    const mapperDtoToDomain: CreatePostulationMapper = new CreatePostulationMapper(
      postulationDto,
    );
    const postulation: Postulation<PostulationStatus> = mapperDtoToDomain.map();
    const postulationToSave: PostulationToSave = {
      id: postulation.getId().idPostulation,
      date: postulation.getDate().getDate(),
      status: postulation.status,
    };

    return postulationToSave;
  }
}

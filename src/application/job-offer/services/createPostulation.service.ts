import IAplicationService from 'src/application/shared/interfaces/IAplicationService';
import IDto from 'src/application/shared/interfaces/IDto';
import CreatePostulationMapper from '../mappers/postulationMapper';
import PostulationToSave from '../ports/postulationToSave.dto';

export default class CreatePostulationService implements IAplicationService {
  execute(postulation: PostulationToSave): PostulationToSave {
    const mapper: CreatePostulationMapper = new CreatePostulationMapper(
      postulation,
    );
    const newPostulation = mapper.map();
    const postulationToSave: PostulationToSave = {
      id: newPostulation.getId().idPostulation,
      date: newPostulation.getDate().date,
      status: newPostulation.status,
    };

    return postulationToSave;
  }
}

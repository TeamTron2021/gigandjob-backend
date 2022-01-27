import CreatePostulationDTO from '../ports/createPostulation.dto';
import PostulationFound from '../ports/postulationFound.dto';

export default interface IPostulationRepository {
  createPostulation(
    postulationDTO: CreatePostulationDTO,
  ): Promise<PostulationFound>;
}

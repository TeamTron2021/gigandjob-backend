import CreatePostulationDTO from '../ports/createPostulation.dto';
import PostulationFound from '../ports/findPostulationResult.dto';

export default interface IPostulationRepository {
  createPostulation(
    postulationDTO: CreatePostulationDTO,
  ): Promise<PostulationFound>;

  findById(id: string): Promise<PostulationFound>;
}

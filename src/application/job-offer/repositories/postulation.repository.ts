import PostulationFound from '../ports/findPostulationResult.dto';
import PostulationToSave from '../ports/postulationToSave.dto';

export default interface IPostulationRepository {
  createPostulation(postulationDTO: PostulationToSave): Promise<void>;

  findById(id: string): Promise<PostulationFound>;

  findPostulations(): Promise<PostulationFound[]>;
}

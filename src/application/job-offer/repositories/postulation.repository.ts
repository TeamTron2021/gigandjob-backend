import CreatePostulationDTO from '../ports/createPostulation.dto';
import PostulationFound from '../ports/findPostulationResult.dto';
import UpdatePostulationStatus from '../ports/updatePostulationStatus.dto';

export default interface IPostulationRepository {
  createPostulation(
    postulationDTO: CreatePostulationDTO,
  ): Promise<PostulationFound>;

  findById(id: string): Promise<PostulationFound>;
  
  updatePostulation(id: string): Promise<UpdatePostulationStatus>;
}

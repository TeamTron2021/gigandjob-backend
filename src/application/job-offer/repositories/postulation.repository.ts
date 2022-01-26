import PostulationFound from '../ports/postulationFound.dto';

export default interface IPostulationRepository {
  createPostulation(postulationDTO: null): Promise<PostulationFound>;
}

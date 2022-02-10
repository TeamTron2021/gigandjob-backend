import CreatePostulationDTO from '../ports/createPostulation.dto';
import PostulationFound from '../ports/findPostulationResult.dto';
import JobOfferFound from '../ports/jobOfferFound.dto';
import PostulationToSave from '../ports/postulationToSave.dto';

export default interface IPostulationRepository {
  createPostulation(
    postulationDto: PostulationToSave,
    jobOffer: JobOfferFound,
  ): Promise<void>;
  
  findById(id: string): Promise<PostulationFound>;
}

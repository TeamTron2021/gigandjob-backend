import { UserDto } from 'src/application/user/User.dto';
import { UserRepository } from 'src/modules/user/user.repository';
import PostulationFound from '../ports/findPostulationResult.dto';
import JobOfferFound from '../ports/jobOfferFound.dto';
import PostulationToSave from '../ports/postulationToSave.dto';

export default interface IPostulationRepository {
  createPostulation(
    postulationDTO: PostulationToSave,
    jobOffer: JobOfferFound,
    user: UserDto,
  ): Promise<void>;

  findById(id: string): Promise<PostulationFound>;

  findPostulations(): Promise<PostulationFound[]>;
}

import { UserDto } from 'src/application/user/User.dto';
import { UserRepository } from 'src/modules/user/user.repository';
import CreatePostulationDTO from '../ports/createPostulation.dto';
import JobOfferFound from '../ports/jobOfferFound.dto';

export default class CreatePostulationCommand {
  constructor(
    public readonly postulation: CreatePostulationDTO,
    public readonly jobOffer: JobOfferFound,
    public readonly user: UserDto,
  ) {}
}

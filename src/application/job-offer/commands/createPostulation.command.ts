import CreatePostulationDTO from '../ports/createPostulation.dto';
import JobOfferFound from '../ports/jobOfferFound.dto';

export default class CreatePostulationCommand {
  constructor(
    public readonly postulation: CreatePostulationDTO,
    public readonly jobOffer: JobOfferFound,
  ) {}
}

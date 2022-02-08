import { Postulation } from 'src/domain/job-offer/entities/postulation';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import CreatePostulationDTO from '../ports/createPostulation.dto';
import { PostulationDate } from 'src/domain/job-offer/value-objects/postulation/PostulationDate';

export default class CreatePostulationMapper {
  constructor(private readonly postulationDTO: CreatePostulationDTO) {}

  public map(): Postulation<PostulationStatus> {
    const dateDomainPostulation: PostulationDate = new PostulationDate(
      new Date(),
    );

    return Postulation.create(dateDomainPostulation);
  }
}

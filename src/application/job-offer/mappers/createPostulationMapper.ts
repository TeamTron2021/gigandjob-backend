
import { PostulationDate } from 'src/domain/job-offer/value-objects/postulation/PostulationDate';
import { PostulationUUID } from 'src/domain/job-offer/value-objects/postulation/PostulationUUID';
import { Postulation } from 'src/domain/job-offer/entities/postulation';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import CreatePostulationDTO from '../ports/createPostulation.dto';

export default class CreatePostulationMapper {
  constructor(private readonly postulationDto: CreatePostulationDTO) {}

  public map(): Postulation<PostulationStatus> {
    const {
      id,
      date,
    } = this.postulationDto;
    const postulationId: PostulationUUID = this.convertToPostulationUUID(id);
    const postulationDate: PostulationDate = this.convertToPostulationDate(
      date
    );
    return Postulation.create(
      postulationDate
    );
  }

  private convertToPostulationUUID(id: string): PostulationUUID {
    return PostulationUUID.create(id);
  }
  private convertToPostulationDate(
    startDate: Date,
  ): PostulationDate {
    return PostulationDate.create(
      new Date(Date.parse(startDate.toString()))
    );
  }
 
}

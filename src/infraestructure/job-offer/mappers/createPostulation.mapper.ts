import CreatePostulationDTO from 'src/application/job-offer/ports/createPostulation.dto';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import { Postulation } from 'src/domain/job-offer/entities/postulation';
import { PostulationDate } from 'src/domain/job-offer/value-objects/postulation/PostulationDate';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';
import PostulationOrm from '../orm/postulation.orm';
import CreatePostulationRequest from '../request/createPostulationRequies.request';

export default class CreatePostulationMapper {
  static convertPostulationsToFound(
    postulations: PostulationOrm[],
  ): PostulationFound[] {
    const postulationToReturn: PostulationFound[] = postulations.map(
      (postulation) => {
        const PostulationFound: PostulationFound = {
          ...postulation,
        };
        return PostulationFound;
      },
    );
    return postulationToReturn;
  }

  public static convertPostulationOrmToDomain(
    postulationOrm: PostulationOrm,
  ): Postulation<PostulationStatus> {
    const dateDomainPostulation: PostulationDate = new PostulationDate(
      new Date(),
    );

    return Postulation.create(dateDomainPostulation);
  }

  public static convertPostulationRequestToDto(
    id: string,
    postulation: CreatePostulationRequest,
  ): CreatePostulationDTO {
    const postulationDTO: CreatePostulationDTO = {
      id: id,
      ...postulation,
    };
    return postulationDTO;
  }
}

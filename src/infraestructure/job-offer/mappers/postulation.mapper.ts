import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import PostulationOrm from '../orm/postulation.orm';

export default class PostulationMapper {
  public static toPostulationFound(postulation: PostulationOrm) {
    const newPostulation: PostulationFound = {
      ...postulation,
    };
    return newPostulation;
  }
}

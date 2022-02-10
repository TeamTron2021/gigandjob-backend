import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import FindPostulationById from 'src/application/job-offer/queries/findPostulationById.query';
import PostulationRepository from '../repositories/postulationRepository.repository';

@QueryHandler(FindPostulationById)
export class findPostulationByIdHandler
  implements IQueryHandler<FindPostulationById, PostulationFound>
{
  constructor(private readonly postulationRepository: PostulationRepository) {}

  async execute(query: FindPostulationById): Promise<PostulationFound> {
    return await this.postulationRepository.findById(query.id);
  }
}

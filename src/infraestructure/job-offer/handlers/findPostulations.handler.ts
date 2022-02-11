import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import FindPostulationsQuery from 'src/application/job-offer/queries/findPostulation.query';
import PostulationRepository from '../repositories/postulationRepository.repository';

@QueryHandler(FindPostulationsQuery)
export class FindPostulationsHandler
  implements IQueryHandler<FindPostulationsQuery, PostulationFound[]>
{
  constructor(private postulationRepository: PostulationRepository) {}
  async execute(query: FindPostulationsQuery): Promise<PostulationFound[]> {
    return await this.postulationRepository.findPostulations();
  }
}

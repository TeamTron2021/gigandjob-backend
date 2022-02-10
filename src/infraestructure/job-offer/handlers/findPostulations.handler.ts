import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import IFindPostulations from 'src/application/job-offer/handlers/findPostulations.handler';
import PostulationFound from 'src/application/job-offer/ports/findPostulationResult.dto';
import FindPostulationsQuery from 'src/application/job-offer/queries/findPostulation.query';
import PostulationRepository from '../repositories/postulationRepository.repository';

@QueryHandler(FindPostulationsQuery)
export class FindPostulationsHandler
  extends IFindPostulations
  implements IQueryHandler<FindPostulationsQuery, PostulationFound[]>
{
  constructor(readonly postulationRepository: PostulationRepository) {
    super(postulationRepository);
  }

  async execute(_query: FindPostulationsQuery): Promise<PostulationFound[]> {
    return await this.postulationRepository.findPostulations();
  }
}

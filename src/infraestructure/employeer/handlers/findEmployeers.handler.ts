import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import IFindEmployeers from 'src/application/employeer/handlers/findEmployeers.handler';
import FindEmployeers from 'src/application/employeer/handlers/findEmployeers.handler';
import EmployeerFound from 'src/application/employeer/ports/findEmployeerResult.dto';
import FindEmployeersQuery from 'src/application/employeer/queries/findEmployeers.query';
import { EmployeerRepository } from '../repositories/Employeer.repository';

@QueryHandler(FindEmployeersQuery)
export class FindEmployeersHandler
  extends IFindEmployeers
  implements IQueryHandler<FindEmployeersQuery, EmployeerFound[]>
{
  constructor(readonly employeerRepository: EmployeerRepository) {
    super(employeerRepository);
  }

  async execute(_query: FindEmployeersQuery): Promise<EmployeerFound[]> {
    return await this.employeerRepository.findEmployeers();
  }
}

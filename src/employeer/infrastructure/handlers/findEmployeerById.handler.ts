import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import EmployeerFound from 'src/employeer/application/ports/findEmployeerResult.dto';
import FindEmployeerById from 'src/employeer/application/queries/findEmployeerById.query';
import { EmployeerRepository } from '../repositories/EntityRepository.repository';

@QueryHandler(FindEmployeerById)
export class findEmployeerByIdHandler
  implements IQueryHandler<FindEmployeerById, EmployeerFound>
{
  constructor(private readonly employeerRepository: EmployeerRepository) {}

  async execute(query: FindEmployeerById): Promise<EmployeerFound> {
    return await this.employeerRepository.findById(query.id);
  }
}

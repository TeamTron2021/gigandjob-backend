import { CVEvents } from 'src/domain/user/entities/CV.entity';
import { CVDto } from './CV.dto';
import { CVPublisher } from './CV.publisher';
import { CVRepository } from './CV.reporsitory';

export class CVService {
  constructor(
    private repository: CVRepository,
    private publisher: CVPublisher,
  ) {}

  async get(uuid: string): Promise<CVDto> {
    return await this.repository.get(uuid);
  }

  publish(events: CVEvents[]) {
    this.publisher.publish(events);
  }
}

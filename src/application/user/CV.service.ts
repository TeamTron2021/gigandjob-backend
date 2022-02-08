import { CVEvents } from 'src/domain/user/entities/CV.entity';
import { CVPublisher } from './CV.publisher';
import { CVRepository } from './CV.reporsitory';

export class CVService {
  constructor(
    private repository: CVRepository,
    private publisher: CVPublisher,
  ) {}

  get(uuid: string) {
    this.repository.get(uuid);
  }

  publish(events: CVEvents[]) {
    this.publisher.publish(events);
  }
}

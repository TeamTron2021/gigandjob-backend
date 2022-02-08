import { CVEvents } from 'src/domain/user/entities/CV.entity';

export class CVIntegrationEvent {
  constructor(public event: CVEvents) {}
}

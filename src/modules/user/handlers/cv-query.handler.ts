import { CVLoaded } from 'src/domain/user/domain_events/CVLoaded.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CVIntegrationEvent } from './events/cv-integration.event';
import { CVQueryDao } from '../cv-query.dao';

@EventsHandler(CVIntegrationEvent)
export class CVQueryListener implements IEventHandler<CVIntegrationEvent> {
  constructor(private dao: CVQueryDao) {}

  async handle(event: CVIntegrationEvent) {
    switch (event.event.constructor) {
      case CVLoaded:
        await this.dao.insert(event.event as CVLoaded);
        break;
    }
  }
}

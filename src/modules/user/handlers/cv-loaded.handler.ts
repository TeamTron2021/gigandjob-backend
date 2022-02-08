import { CVLoaded } from 'src/domain/user/domain_events/CVLoaded.event';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CVCommandDao } from '../cv-command.dao';
import { CVIntegrationEvent } from './events/cv-integration.event';

@EventsHandler(CVLoaded)
export class CVLoadedHandler implements IEventHandler<CVLoaded> {
  constructor(
    private dao: CVCommandDao,
    private bus: EventBus<CVIntegrationEvent>,
  ) {}
  async handle(event: CVLoaded) {
    await this.dao.insert(event);
    this.bus.publish(new CVIntegrationEvent(event));
  }
}

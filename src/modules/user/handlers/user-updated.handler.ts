import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserDataUpdated } from 'src/domain/user/domain_events/UserDataUpdated.event';
import { UserCommandDao } from '../user-command.dao';
import { UserIntegrationEvent } from './events/user-integration.event';

@EventsHandler(UserDataUpdated)
export class UserDataUpdatedHandler implements IEventHandler<UserDataUpdated> {
  constructor(
    private dao: UserCommandDao,
    private bus: EventBus<UserIntegrationEvent>,
  ) {}
  async handle(event: UserDataUpdated) {
    await this.dao.update(event);
    this.bus.publish(new UserIntegrationEvent(event));
  }
}

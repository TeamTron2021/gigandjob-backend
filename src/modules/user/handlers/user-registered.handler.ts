import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegistered } from 'src/domain/user/domain_events/UserRegistered.event';
import { UserCommandDao } from '../user-command.dao';
import { UserIntegrationEvent } from './events/user-integration.event';

@EventsHandler(UserRegistered)
export class UserRegisteredHandler implements IEventHandler<UserRegistered> {
  constructor(
    private dao: UserCommandDao,
    private bus: EventBus<UserIntegrationEvent>,
  ) {}
  async handle(event: UserRegistered) {
    await this.dao.insert(event);
    this.bus.publish(new UserIntegrationEvent(event));
  }
}

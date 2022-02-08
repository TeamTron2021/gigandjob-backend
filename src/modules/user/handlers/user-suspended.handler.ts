import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserSuspended } from 'src/domain/user/domain_events/UserSuspended.event';
import { UserCommandDao } from '../user-command.dao';
import { UserIntegrationEvent } from './events/user-integration.event';

@EventsHandler(UserSuspended)
export class UserSuspendedHandler implements IEventHandler<UserSuspended> {
  constructor(
    private dao: UserCommandDao,
    private bus: EventBus<UserIntegrationEvent>,
  ) {}
  async handle(event: UserSuspended) {
    console.log('suspend');
    await this.dao.suspend(event);
    this.bus.publish(new UserIntegrationEvent(event));
  }
}

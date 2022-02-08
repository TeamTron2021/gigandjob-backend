import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserReactivated } from 'src/domain/user/domain_events/UserReactivated.event';
import { UserSuspended } from 'src/domain/user/domain_events/UserSuspended.event';
import { UserCommandDao } from '../user-command.dao';
import { UserIntegrationEvent } from './events/user-integration.event';

@EventsHandler(UserReactivated)
export class UserReactivatedHandler implements IEventHandler<UserReactivated> {
  constructor(
    private dao: UserCommandDao,
    private bus: EventBus<UserIntegrationEvent>,
  ) {}
  async handle(event: UserReactivated) {
    console.log('reactive');
    await this.dao.reactive(event);
    this.bus.publish(new UserIntegrationEvent(event));
  }
}

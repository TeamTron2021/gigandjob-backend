import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserReactivated } from 'src/domain/user/domain_events/UserReactivated.event';
import { UserCommandDao } from '../user-command.dao';
import { UserIntegrationEvent } from './events/user-integration.event';

@EventsHandler(UserReactivated)
export class UserReactivatedHandler implements IEventHandler<UserReactivated> {
  constructor(
    private dao: UserCommandDao,
    private bus: EventBus<UserIntegrationEvent>,
  ) {}
  async handle(event: UserReactivated) {
    await this.dao.reactive(event);
    this.bus.publish(new UserIntegrationEvent(event));
  }
}

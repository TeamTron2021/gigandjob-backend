import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserAccountDeleted } from 'src/domain/user/domain_events/UserAccountDeleted.event';
import { UserCommandDao } from '../user-command.dao';
import { UserIntegrationEvent } from './events/user-integration.event';

@EventsHandler(UserAccountDeleted)
export class UserAccountDeletedHandler
  implements IEventHandler<UserAccountDeleted>
{
  constructor(
    private dao: UserCommandDao,
    private bus: EventBus<UserIntegrationEvent>,
  ) {}
  async handle(event: UserAccountDeleted) {
    console.log('delete');
    await this.dao.delete(event);
    this.bus.publish(new UserIntegrationEvent(event));
  }
}

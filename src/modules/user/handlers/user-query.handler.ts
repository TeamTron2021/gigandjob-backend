import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegistered } from 'src/domain/user/domain_events/UserRegistered.event';
import { UserQueryDao } from '../user-query.dao';
import { UserIntegrationEvent } from './events/user-integration.event';

@EventsHandler(UserIntegrationEvent)
export class UserQueryListener implements IEventHandler<UserIntegrationEvent> {
  constructor(private dao: UserQueryDao) {}

  async handle(event: UserIntegrationEvent) {
    switch (event.event.constructor) {
      case UserRegistered:
        await this.dao.insert(event.event as UserRegistered);
        break;
    }
  }
}

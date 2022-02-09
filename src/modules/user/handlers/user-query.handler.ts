import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserAccountDeleted } from 'src/domain/user/domain_events/UserAccountDeleted.event';
import { UserDataUpdated } from 'src/domain/user/domain_events/UserDataUpdated.event';
import { UserReactivated } from 'src/domain/user/domain_events/UserReactivated.event';
import { UserRegistered } from 'src/domain/user/domain_events/UserRegistered.event';
import { UserSuspended } from 'src/domain/user/domain_events/UserSuspended.event';
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
      case UserDataUpdated:
        await this.dao.update(event.event as UserDataUpdated);
        break;
      case UserAccountDeleted:
        await this.dao.delete(event.event as UserAccountDeleted);
        break;
      case UserSuspended:
        await this.dao.suspend(event.event as UserSuspended);
        break;
      case UserReactivated:
        await this.dao.reactive(event.event as UserReactivated);
        break;
    }
  }
}

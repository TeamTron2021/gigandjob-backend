import { UserEvent } from 'src/domain/user/User.aggregate';

export class UserIntegrationEvent {
  constructor(public event: UserEvent) {}
}

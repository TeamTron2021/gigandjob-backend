import { UserEvent } from '../../domain/user/User.aggregate';

export interface UserPublisher {
  publish(events: UserEvent[]): void;
}

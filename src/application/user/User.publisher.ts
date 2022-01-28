import { UserEvent } from 'src/domain/user/User.aggregate';

export interface UserPublisher {
  publish(events: UserEvent[]): void;
}

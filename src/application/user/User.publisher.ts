import { UserRegistered } from '../../domain/user/domain_events/UserRegistered.event';

export interface UserPublisher {
  publishUserRegistered(event: UserRegistered): void;
}

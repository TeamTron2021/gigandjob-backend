import { UserRegistered } from 'src/domain/user/domain_events/UserRegistered.event';
import { UserPublisher } from './User.publisher';
import { UserRepository } from './User.repository';

export class UserService {
  constructor(
    private repository: UserRepository,
    private publisher: UserPublisher,
  ) {}

  find(uuid: string) {
    this.repository.find(uuid);
  }

  publishUserRegistered(event: UserRegistered) {
    this.publisher.publishUserRegistered(event);
  }
}

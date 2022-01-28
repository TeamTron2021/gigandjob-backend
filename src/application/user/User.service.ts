import { UserEvent } from 'src/domain/user/User.aggregate';
import { UserPublisher } from './User.publisher';
import { UserRepository } from './User.repository';

export class UserService {
  constructor(
    private repository: UserRepository,
    private publisher: UserPublisher,
  ) {}

  get(uuid: string) {
    this.repository.get(uuid);
  }

  publish(events: UserEvent[]) {
    this.publisher.publish(events);
  }
}

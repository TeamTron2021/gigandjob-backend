import { UserEvent } from '../../domain/user/User.aggregate';
import { UserDto } from './User.dto';
import { UserPublisher } from './User.publisher';
import { UserRepository } from './User.repository';

export class UserService {
  constructor(
    private repository: UserRepository,
    private publisher: UserPublisher,
  ) {}

  async get(uuid: string): Promise<UserDto> {
    return await this.repository.get(uuid);
  }

  async getAll(): Promise<UserDto[]> {
    return await this.repository.getAll();
  }

  publish(events: UserEvent[]) {
    this.publisher.publish(events);
  }
}

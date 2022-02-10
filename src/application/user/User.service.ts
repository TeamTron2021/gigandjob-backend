import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { User, UserEvent } from '../../domain/user/User.aggregate';
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

  async getUser(uuid: string): Promise<User<UserStatus>> {
    return this.repository.getUser(uuid);
  }

  async getUserWithStatus<T extends UserStatus>(
    uuid: string,
    options: T,
  ): Promise<User<T>> {
    if (options) return this.repository.getUserWithStatus(uuid, options);
    return this.repository.getUserWithStatus(uuid, options);
  }

  publish(events: UserEvent[]) {
    this.publisher.publish(events);
  }
}

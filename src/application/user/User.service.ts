import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { UserSuspendedHandler } from 'src/modules/user/handlers/user-suspended.handler';
import { User, UserEvent } from '../../domain/user/User.aggregate';
import { UserDto } from './User.dto';
import { UserPublisher } from './User.publisher';
import { UserRepository, UserStatusOrDefault } from './User.repository';

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

  async getUser<T extends UserStatus>(
    uuid: string,
    options: T,
  ): Promise<User<T>> {
    if (options) return this.repository.getUser(uuid, options);
    return this.repository.getUser(uuid, options);
  }

  async getUserWithoutOptions(uuid: string): Promise<User<UserStatus>> {
    return this.repository.getUserWithoutOptions(uuid);
  }

  publish(events: UserEvent[]) {
    this.publisher.publish(events);
  }
}

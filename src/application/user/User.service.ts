import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { UserSuspendedHandler } from 'src/modules/user/handlers/user-suspended.handler';
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

  async getUser<T extends UserStatus>(
    uuid: string,
    { status: T },
  ): Promise<User<T>> {
    return await this.repository.getUser(uuid, { status });
  }

  publish(events: UserEvent[]) {
    this.publisher.publish(events);
  }
}

import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { User } from 'src/domain/user/User.aggregate';
import { UserDto } from './User.dto';

export interface UserRepository {
  get(uuid: string): Promise<UserDto>;
  getAll(): Promise<UserDto[]>;
  getUconfirmedUser(uuid: string): Promise<User<UserStatus.Unconfirmed>>;
  getSuspendedUser(uuid: string): Promise<User<UserStatus.Supended>>;
  getActiveUser(uuid: string): Promise<User<UserStatus.Active>>;
}

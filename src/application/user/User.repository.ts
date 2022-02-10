import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { User } from 'src/domain/user/User.aggregate';
import { UserDto } from './User.dto';

export type UserStatusOrDefault<T> = [T] extends [null]
  ? User
  : [T] extends [UserStatus]
  ? User<T>
  : never;

export interface UserRepository {
  get(uuid: string): Promise<UserDto>;
  getAll(): Promise<UserDto[]>;
  getUser(uuid: string): Promise<User<UserStatus>>;
  getUserWithStatus<T extends UserStatus>(
    uuid: string,
    options: T,
  ): Promise<User<T>>;
}

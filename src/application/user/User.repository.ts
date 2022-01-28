import { UserDto } from './User.dto';

export interface UserRepository {
  get(uuid: string): Promise<UserDto>;
}

import { UserDto } from './User.dto';

export interface UserRepository {
  find(uuid: string): UserDto;
}

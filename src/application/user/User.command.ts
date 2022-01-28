import { UserService } from './User.service';

export interface UserCommand {
  execute(service: UserService): void;
}

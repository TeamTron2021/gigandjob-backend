import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { User } from '../../../domain/user/User.aggregate';
import { UserCommand } from '../User.command';
import { UserService } from '../User.service';

export class DeleteUserAccount implements UserCommand {
  constructor(private readonly ID: string) {}

  async execute(service: UserService) {
    const user: User<UserStatus> = await service.getUser(this.ID);
    user.deleteAccount();
    service.publish(user.getEvents());
  }
}

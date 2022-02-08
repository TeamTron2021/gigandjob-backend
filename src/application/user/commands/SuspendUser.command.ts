import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { User } from '../../../domain/user/User.aggregate';
import { UserCommand } from '../User.command';
import { UserService } from '../User.service';

export class SuspendUser implements UserCommand {
  constructor(private readonly ID: string) {}

  async execute(service: UserService) {
    const user: User<UserStatus.Unconfirmed | UserStatus.Active> =
      await service.getUser(this.ID, {
        status: UserStatus.Unconfirmed | UserStatus.Active,
      });
    const userSuspended: User<UserStatus.Supended> = user.suspend();
    service.publish(userSuspended.getEvents());
  }
}

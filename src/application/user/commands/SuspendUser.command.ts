import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { User } from '../../../domain/user/User.aggregate';
import { UserCommand } from '../User.command';
import { UserService } from '../User.service';

export class SuspendUser implements UserCommand {
  constructor(private readonly ID: string) {}

  async execute(service: UserService) {
    const userUnconfirmated: User<UserStatus.Unconfirmed> =
      await service.getUserWithStatus<UserStatus.Unconfirmed>(
        this.ID,
        UserStatus.Unconfirmed,
      );
    if (userUnconfirmated) {
      const userSuspended: User<UserStatus.Supended> =
        userUnconfirmated.suspend();
      service.publish(userSuspended.getEvents());
    } else {
      const userActivated: User<UserStatus.Active> =
        await service.getUserWithStatus<UserStatus.Active>(
          this.ID,
          UserStatus.Active,
        );

      if (userActivated) {
        const userSuspended: User<UserStatus.Supended> =
          userActivated.suspend();
        service.publish(userSuspended.getEvents());
      }
    }
  }
}

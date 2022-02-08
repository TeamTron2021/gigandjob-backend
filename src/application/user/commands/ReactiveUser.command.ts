import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { User } from '../../../domain/user/User.aggregate';
import { UserCommand } from '../User.command';
import { UserService } from '../User.service';

export class ReactiveUser implements UserCommand {
  constructor(private readonly ID: string) {}

  async execute(service: UserService) {
    const user: User<UserStatus.Supended> = await service.getUser(this.ID, {
      status: UserStatus.Supended,
    });
    const userReactivated: User<UserStatus.Active> = user.reactive();
    service.publish(userReactivated.getEvents());
  }
}

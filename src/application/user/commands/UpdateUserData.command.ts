import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { User } from '../../../domain/user/User.aggregate';
import { UserBirthday } from '../../../domain/user/value_objects/UserBirthday.value';
import { UserEmail } from '../../../domain/user/value_objects/UserEmail.value';
import { UserFirstName } from '../../../domain/user/value_objects/UserFirstName.value';
import { UserLastName } from '../../../domain/user/value_objects/UserLastName.value';
import { UserPassword } from '../../../domain/user/value_objects/UserPassword.value';
import { UserCommand } from '../User.command';
import { UserService } from '../User.service';

export class UpdateUserData implements UserCommand {
  constructor(
    private readonly ID: string,
    private readonly firstname: string,
    private readonly lastname: string,
    private readonly birthday: Date,
    private readonly email: string,
    private readonly password: string,
  ) {}

  async execute(service: UserService) {
    const user: User<UserStatus> = await service.getUser(this.ID);
    const newPassword: UserPassword = this.password
      ? new UserPassword(this.password)
      : user.password;
    user.updateData(
      new UserFirstName(this.firstname),
      new UserLastName(this.lastname),
      new UserBirthday(this.birthday),
      new UserEmail(this.email),
      newPassword,
    );

    service.publish(user.getEvents());
  }
}

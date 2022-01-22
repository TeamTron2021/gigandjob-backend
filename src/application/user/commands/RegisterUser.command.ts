import { UserRegistered } from '../../../domain/user/domain_events/UserRegistered.event';
import { User } from '../../../domain/user/User.aggregate';
import { UserBirthday } from '../../../domain/user/value_objects/UserBirthday.value';
import { UserEmail } from '../../../domain/user/value_objects/UserEmail.value';
import { UserFirstName } from '../../../domain/user/value_objects/UserFirstName.value';
import { UserLastName } from '../../../domain/user/value_objects/UserLastName.value';
import { UserPassword } from '../../../domain/user/value_objects/UserPassword.value';
import { UserCommand } from '../User.command';
import { UserService } from '../User.service';

export class RegisterUser implements UserCommand {
  constructor(
    private readonly firstname: string,
    private readonly lastname: string,
    private readonly birthday: Date,
    private readonly email: string,
    private readonly password: string,
  ) {}

  execute(service: UserService) {
    const user = User.register(
      new UserFirstName(this.firstname),
      new UserLastName(this.lastname),
      new UserBirthday(this.birthday),
      new UserEmail(this.email),
      new UserPassword(this.password),
    );

    user
      .getEvents()
      .forEach((event) =>
        service.publishUserRegistered(event as UserRegistered),
      );
  }
}

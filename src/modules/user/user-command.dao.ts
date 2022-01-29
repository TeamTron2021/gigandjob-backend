import { UserRegistered } from 'src/domain/user/domain_events/UserRegistered.event';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserCommandEntity as UserCommand } from './user-command.entity';

@EntityRepository(UserCommand)
export class UserCommandDao extends AbstractRepository<UserCommand> {
  async insert(event: UserRegistered) {
    await this.manager.insert(UserCommand, {
      id: event.ID.value,
      firstname: event.firstname.value,
      lastname: event.lastname.value,
      birthday: event.birthday.value,
      email: event.email.value,
      password: event.password.value,
      status: event.status,
    });
  }
}

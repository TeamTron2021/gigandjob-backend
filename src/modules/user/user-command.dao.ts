import { UserAccountDeleted } from 'src/domain/user/domain_events/UserAccountDeleted.event';
import { UserDataUpdated } from 'src/domain/user/domain_events/UserDataUpdated.event';
import { UserReactivated } from 'src/domain/user/domain_events/UserReactivated.event';
import { UserRegistered } from 'src/domain/user/domain_events/UserRegistered.event';
import { UserSuspended } from 'src/domain/user/domain_events/UserSuspended.event';
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

  async update(event: UserDataUpdated) {
    await this.manager.save(UserCommand, {
      id: event.ID.value,
      firstname: event.firstname.value,
      lastname: event.lastname.value,
      birthday: event.birthday.value,
      email: event.email.value,
      password: event.password.value,
    });
  }

  async delete(event: UserAccountDeleted) {
    await this.manager.delete(UserCommand, event.ID.value);
  }

  async suspend(event: UserSuspended) {
    await this.manager.save(UserCommand, {
      id: event.ID.value,
      status: event.status,
    });
  }

  async reactive(event: UserReactivated) {
    await this.manager.save(UserCommand, {
      id: event.ID.value,
      status: event.status,
    });
  }
}

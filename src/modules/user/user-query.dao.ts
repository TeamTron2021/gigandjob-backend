import { UserAccountDeleted } from 'src/domain/user/domain_events/UserAccountDeleted.event';
import { UserDataUpdated } from 'src/domain/user/domain_events/UserDataUpdated.event';
import { UserReactivated } from 'src/domain/user/domain_events/UserReactivated.event';
import { UserRegistered } from 'src/domain/user/domain_events/UserRegistered.event';
import { UserSuspended } from 'src/domain/user/domain_events/UserSuspended.event';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserQueryEntity as UserQuery } from './user-query.entity';

@EntityRepository(UserQuery)
export class UserQueryDao extends AbstractRepository<UserQuery> {
  async insert(event: UserRegistered) {
    await this.manager.insert(UserQuery, {
      id: event.ID.value,
      data: {
        firstname: event.firstname.value,
        lastname: event.lastname.value,
        birthday: event.birthday.value,
        email: event.email.value,
        password: event.password.value,
        status: event.status,
      },
    });
  }
  async update(event: UserDataUpdated) {
    const user: UserQuery = await this.manager.findOne(event.ID.value);
    console.log(event);
    await this.manager.save(UserQuery, {
      id: event.ID.value,
      data: {
        firstname: event.firstname.value,
        lastname: event.lastname.value,
        birthday: event.birthday.value,
        email: event.email.value,
        password: event.password.value,
        status: user.data.status,
      },
    });
  }

  async delete(event: UserAccountDeleted) {
    await this.manager.delete(UserQuery, event.ID.value);
  }

  async suspend(event: UserSuspended) {
    await this.manager.save(UserQuery, {
      id: event.ID.value,
      status: event.status,
    });
  }

  async reactive(event: UserReactivated) {
    await this.manager.save(UserQuery, {
      id: event.ID.value,
      status: event.status,
    });
  }
}

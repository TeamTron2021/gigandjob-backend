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
      status: event.status,
    });
  }
  async update(event: UserDataUpdated) {
    const user: UserQuery = await this.manager.findOne(
      UserQuery,
      event.ID.value,
    );
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
      status: user.data.status,
    });
  }

  async delete(event: UserAccountDeleted) {
    await this.manager.delete(UserQuery, event.ID.value);
  }

  async suspend(event: UserSuspended) {
    const user: UserQuery = await this.manager.findOne(
      UserQuery,
      event.ID.value,
    );
    user.data.status = event.status;
    await this.manager.save(UserQuery, {
      id: event.ID.value,
      data: user.data,
      status: event.status,
    });
  }

  async reactive(event: UserReactivated) {
    const user: UserQuery = await this.manager.findOne(
      UserQuery,
      event.ID.value,
    );
    user.data.status = event.status;
    await this.manager.save(UserQuery, {
      id: event.ID.value,
      data: user.data,
      status: event.status,
    });
  }
}

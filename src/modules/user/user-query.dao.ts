import { UserRegistered } from 'src/domain/user/domain_events/UserRegistered.event';
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
}

import { Injectable } from '@nestjs/common';
import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { User } from 'src/domain/user/User.aggregate';
import { UserBirthday } from 'src/domain/user/value_objects/UserBirthday.value';
import { UserEmail } from 'src/domain/user/value_objects/UserEmail.value';
import { UserFirstName } from 'src/domain/user/value_objects/UserFirstName.value';
import { UserID } from 'src/domain/user/value_objects/UserID.value';
import { UserLastName } from 'src/domain/user/value_objects/UserLastName.value';
import { UserPassword } from 'src/domain/user/value_objects/UserPassword.value';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto as UserDto } from '../../application/user/User.dto';
import { UserRepository as IUserRepository } from '../../application/user/User.repository';
import { UserQueryEntity as UserQuery } from './user-query.entity';

@EntityRepository(UserQuery)
export class UserRepository
  extends Repository<UserQuery>
  implements IUserRepository
{
  async get(uuid: string): Promise<UserDto> {
    const user: UserQuery = await this.findOne(uuid);
    const userDto: UserDto = {
      ID: user.id,
      firstname: user.data.firstname,
      lastname: user.data.lastname,
      birthday: user.data.birthday,
      email: user.data.email,
      status: UserStatus[user.data.status],
    };
    return userDto;
  }

  async getAll(): Promise<UserDto[]> {
    const users: UserQuery[] = await this.find();
    let usersDto: UserDto[] = users.map((user) => {
      return {
        ID: user.id,
        firstname: user.data.firstname,
        lastname: user.data.lastname,
        birthday: user.data.birthday,
        email: user.data.email,
        status: UserStatus[user.data.status],
      };
    });
    return usersDto;
  }

  async getUser<T extends UserStatus>(
    uuid: string,
    options: { status: T },
  ): Promise<User<T>> {
    const userQuery: UserQuery = await this.findOne(uuid, {
      where: { status: options.status },
    });
    let user: User<UserStatus> = new User(
      new UserFirstName(userQuery.data.firstname),
      new UserLastName(userQuery.data.lastname),
      new UserBirthday(userQuery.data.birthday),
      new UserEmail(userQuery.data.email),
      new UserPassword(userQuery.data.password),
      userQuery.data.status,
      new UserID(userQuery.id),
    );
    if (user.is(options.status)) return user;
    else return null;
  }
}

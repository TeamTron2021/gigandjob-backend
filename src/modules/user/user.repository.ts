import { Injectable } from '@nestjs/common';
import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
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
}

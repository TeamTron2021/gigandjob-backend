import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto as UserDto } from '../../application/user/User.dto';
import { UserRepository as IUserRepository } from '../../application/user/User.repository';
import { UserQuery as UserQuery } from './user-query.entity';

@Injectable()
@EntityRepository(UserQuery)
export class UserRepository
  extends Repository<UserQuery>
  implements IUserRepository
{
  async get(uuid: string): Promise<UserDto> {
    const user: UserQuery = await this.findOne(uuid);
    const userDto: UserDto = {
      ID: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      birthday: user.birthday,
      email: user.email,
      password: user.password,
      status: user.status,
    };
    return userDto;
  }
}

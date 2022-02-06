import { NotFoundException } from '@nestjs/common';
import { UserDto } from 'src/application/user/User.dto';
import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { UserQueryEntity } from 'src/modules/user/user-query.entity';
import { EntityRepository, Repository } from 'typeorm';
import AuthDto from '../../dtos/auth.dto';
import UserQueryDto from '../dtos/userQuery.dto';

@EntityRepository(UserQueryEntity)
export default class AuthUserRepository extends Repository<UserQueryEntity> {
  async findUser(userToFind: AuthDto) {
    const { email } = userToFind;
    const query = this.createQueryBuilder('users_query');
    query.where(`users_query.data ::jsonb @> \'{"email":"${email}"}\'`);
    try {
      const userFound = await query.getOne();
      const user: UserQueryDto = {
        email: userFound.data.email,
        id: userFound.id,
        password: userFound.data.password,
      };
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async findUserById(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      return;
    }
    const userToSend: UserQueryDto = {
      id: user.id,
      email: user.data.email,
      password: user.data.password,
    };
    return userToSend;
  }
}

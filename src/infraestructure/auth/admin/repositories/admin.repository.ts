import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import AuthDto from '../../dtos/auth.dto';
import { AdminDto } from '../dtos/admin.dto';
import AdminORM from '../orm/admin.orm';

@EntityRepository(AdminORM)
export default class AdminRepository extends Repository<AdminORM> {
  async findAdmin(authDto: AuthDto) {
    const { email } = authDto;
    try {
      const admin = await this.findOne({ email: email });
      const result: AdminDto = {
        ...admin,
      };
      return result;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  async findAdminById(id: string) {
    const admin = await this.findOne(id);
    if (!admin) {
      return;
    }
    const adminToSend: AdminDto = {
      ...admin,
    };
    return adminToSend;
  }
  // async createAdmin(admin: AuthDto, id: string) {
  //   const newAdmin: AdminORM = {
  //     ...admin,
  //     id: id,
  //   };
  //   return await this.save(newAdmin);
  // }
}

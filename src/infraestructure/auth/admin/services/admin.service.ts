import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UniqueId from 'src/shared/domain/UniqueUUID';
import AuthDto from '../../dtos/auth.dto';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import AdminRepository from '../repositories/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private jwtService: JwtService,
  ) {}

  async login(auth: AuthDto) {
    const admin = await this.adminRepository.findAdmin(auth);
    if (admin && admin.password == auth.password) {
      const payload: JwtPayload = {
        id: admin.id,
      };
      const accessToken = await this.jwtService.sign(payload);
      return {
        access_token: accessToken,
        id: admin.id,
      };
    }
    throw new UnauthorizedException();
  }
  //   async create(admin: AuthDto) {
  //     const id = new UniqueId().getId();
  //     return await this.adminRepository.createAdmin(admin, id);
  //   }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import AdminRepository from '../repositories/admin.repository';

@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    private configService: ConfigService,
    private readonly adminRepository: AdminRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const admin = await this.adminRepository.findAdminById(id);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}

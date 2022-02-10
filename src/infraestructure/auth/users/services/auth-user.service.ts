import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthDto from '../../dtos/auth.dto';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import AuthUserRepository from '../repositories/user-auth.repository';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly userRepository: AuthUserRepository,
    private jwtService: JwtService,
  ) {}
  async login(authDto: AuthDto) {
    const user = await this.userRepository.findUser(authDto);
    if (user && user.password == authDto.password) {
      const payload: JwtPayload = {
        id: user.id,
      };
      const accessToken = await this.jwtService.sign(payload);
      return {
        access_token: accessToken,
        id: user.id,
      };
    }
    throw new UnauthorizedException('Credenciales de ingreso incorrectas');
  }
}

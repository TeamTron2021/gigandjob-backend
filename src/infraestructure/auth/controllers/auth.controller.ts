import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthDto from '../dtos/auth.dto';
import { AuthUserService } from '../users/services/auth-user.service';

@Controller('auth/user')
export class AuthController {
  constructor(private readonly authService: AuthUserService) {}
  @Post()
  async test(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }
}

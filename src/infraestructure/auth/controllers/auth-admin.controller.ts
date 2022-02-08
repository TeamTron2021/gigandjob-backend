import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from '../admin/services/admin.service';
import AuthDto from '../dtos/auth.dto';

@Controller('auth/admin')
export class AuthAdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post()
  async login(@Body() authDto: AuthDto) {
    return await this.adminService.login(authDto);
  }
  //   @Post('/create')
  //   async createAdmin(@Body() authDto: AuthDto) {
  //     return await this.adminService.create(authDto);
  //   }
}

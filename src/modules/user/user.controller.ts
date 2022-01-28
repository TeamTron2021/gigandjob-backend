import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterUser } from 'src/application/user/commands/RegisterUser.command';
import { UserDto } from 'src/application/user/User.dto';
import { UserService } from 'src/application/user/User.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return await this._userService.get(id);
  }

  @Post()
  async register(@Body() user: UserDto): Promise<void> {
    const command: RegisterUser = new RegisterUser(
      user.firstname,
      user.lastname,
      user.birthday,
      user.email,
      user.password,
    );
    command.execute(this._userService);
  }
}

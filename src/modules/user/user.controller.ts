import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteUserAccount } from 'src/application/user/commands/DeleteUserAccount.command';
import { ReactiveUser } from 'src/application/user/commands/ReactiveUser.command';
import { RegisterUser } from 'src/application/user/commands/RegisterUser.command';
import { SuspendUser } from 'src/application/user/commands/SuspendUser.command';
import { UpdateUserData } from 'src/application/user/commands/UpdateUserData.command';
import { UserDto } from 'src/application/user/User.dto';
import { UserService } from 'src/application/user/User.service';

type UserRegistrationForm = {
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
  password: string;
};

type UserUpdatingForm = {
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
  password: string;
};

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this._userService.getAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return await this._userService.get(id);
  }

  @Post()
  async register(@Body() user: UserRegistrationForm): Promise<void> {
    const command: RegisterUser = new RegisterUser(
      user.firstname,
      user.lastname,
      new Date(user.birthday),
      user.email,
      user.password,
    );
    command.execute(this._userService);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UserUpdatingForm,
  ): Promise<void> {
    const command: UpdateUserData = new UpdateUserData(
      id,
      user.firstname,
      user.lastname,
      new Date(user.birthday),
      user.email,
      user.password,
    );
    command.execute(this._userService);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const command: DeleteUserAccount = new DeleteUserAccount(id);
    command.execute(this._userService);
  }

  @Post(':id/suspend')
  async suspend(@Param('id') id: string): Promise<void> {
    const command: SuspendUser = new SuspendUser(id);
    command.execute(this._userService);
  }

  @Post(':id/reactive')
  async reactive(@Param('id') id: string): Promise<void> {
    const command: ReactiveUser = new ReactiveUser(id);
    command.execute(this._userService);
  }
}

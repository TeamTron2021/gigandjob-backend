import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { DeleteUserAccount } from 'src/application/user/commands/DeleteUserAccount.command';
import { ReactiveUser } from 'src/application/user/commands/ReactiveUser.command';
import { RegisterUser } from 'src/application/user/commands/RegisterUser.command';
import { SuspendUser } from 'src/application/user/commands/SuspendUser.command';
import { UpdateUserData } from 'src/application/user/commands/UpdateUserData.command';
import { UserDto } from 'src/application/user/User.dto';
import { UserService } from 'src/application/user/User.service';
import { ResponseDescription } from 'src/infraestructure/employeer/shared/enums/response-description.enum';

class UserRegistrationForm {
  @ApiProperty({ example: 'Jonathan' })
  firstname: string;
  @ApiProperty({ example: 'Martinez' })
  lastname: string;
  @ApiProperty({ example: 'April 4 1987 00:00:00' })
  birthday: string;
  @ApiProperty({ example: 'jonathan@example.com' })
  email: string;
  @ApiProperty({ example: 'jonathan-martinez' })
  password: string;
}

class UserUpdatingForm {
  @ApiProperty({ example: 'Jonathan' })
  firstname: string;
  @ApiProperty({ example: 'Joestar' })
  lastname: string;
  @ApiProperty({ example: 'January 31 2000 00:00:00' })
  birthday: string;
  @ApiProperty({ example: 'jonathan@joestar.com' })
  email: string;
  @ApiProperty({ example: 'jonathan-joestar' })
  password: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this._userService.getAll();
  }

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @Get(':id')
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return await this._userService.get(id);
  }

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
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

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
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

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const command: DeleteUserAccount = new DeleteUserAccount(id);
    command.execute(this._userService);
  }

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Post(':id/suspend')
  async suspend(@Param('id') id: string): Promise<void> {
    const command: SuspendUser = new SuspendUser(id);
    command.execute(this._userService);
  }

  @ApiResponse({ status: 200, description: ResponseDescription.OK })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Post(':id/reactive')
  async reactive(@Param('id') id: string): Promise<void> {
    const command: ReactiveUser = new ReactiveUser(id);
    command.execute(this._userService);
  }
}

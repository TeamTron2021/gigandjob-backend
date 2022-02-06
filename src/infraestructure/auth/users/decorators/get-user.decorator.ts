import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import UserQueryDto from '../dtos/userQuery.dto';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserQueryDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

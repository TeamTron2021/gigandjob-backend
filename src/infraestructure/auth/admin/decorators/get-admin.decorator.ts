import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AdminDto } from '../dtos/admin.dto';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): AdminDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.admin;
  },
);

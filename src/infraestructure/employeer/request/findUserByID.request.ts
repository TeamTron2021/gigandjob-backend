import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindUserByIdRequest {
  //@IsUUID('all')
  @ApiProperty({
    format: 'uuid',
    example: 'b33fc80b-ef99-4ff5-988d-d1df607fc55b',
  })
  readonly userId: string;
}

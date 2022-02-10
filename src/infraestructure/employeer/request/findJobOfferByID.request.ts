import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindJobOfferByIdRequest {
  @IsUUID()
  @ApiProperty({
    format: 'uuid',
    example: 'ffa2f8be-237c-4334-ad9e-99e72e1a8501',
  })
  readonly id: string;
}

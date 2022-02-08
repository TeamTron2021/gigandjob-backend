import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PostulationStatus } from 'src/domain/job-offer/value-objects/postulation/PostulationStatus';

export default class CreatePostulationRequest {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: Date(),
  })
  date: Date;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: PostulationStatus.isSend,
  })
  status: string;
}

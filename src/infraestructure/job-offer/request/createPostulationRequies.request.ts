import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export default class CreatePostulationRequest {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;
  @IsNotEmpty()
  @IsString()
  status: string;
}

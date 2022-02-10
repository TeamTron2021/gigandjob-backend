import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';


export default class CreateInterviewRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @ApiProperty({
    minLength: 2,
    example: 'Entrevista web',
  })
  title: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({
    minLength: 5,
    example: 'Entrevista online',
  })
  description: string;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;
  
}

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
  title: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  interviewed: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  interviewer: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  status: string;
  
}

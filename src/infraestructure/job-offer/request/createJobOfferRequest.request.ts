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
import { SkillRequest } from './createSkills.request';

export default class CreateJobOfferRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  salary: number;
  @Type(() => SkillRequest)
  @ValidateNested()
  @IsNotEmpty()
  skills: SkillRequest[];
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  title: string;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  vacant: number;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  finalDate: Date;
}

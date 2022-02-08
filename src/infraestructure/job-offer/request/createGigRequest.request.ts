import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';
import { Time } from 'src/domain/job-offer/shared/Time.enum';
import { SkillRequest } from './createSkills.request';

export default class CreateGigRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({
    minLength: 5,
    example: 'Necesitamos un desarrollador web que sepa nestJs',
  })
  description: string;
  @IsNotEmpty()
  @IsInt()
  @Min(10)
  @ApiProperty({
    minimum: 10,
    example: 500,
  })
  salary: number;
  @Type(() => SkillRequest)
  @ValidateNested()
  @IsNotEmpty()
  @ApiProperty({
    example: `[{'skill':'mongo'}, {'skill':'Solucionador de problemas'}]`,
  })
  skills: SkillRequest[];
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @ApiProperty({
    minLength: 2,
    example: 'Desarrollador web',
  })
  title: string;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({ minimum: 1, example: 5 })
  vacant: number;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({ example: '2022-12-17T03:24:00' })
  startDate: Date;
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({ example: '2022-12-17T03:24:00' })
  finalDate: Date;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'MONTHS' })
  time: Time;
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ example: 1 })
  amount: number;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export default class RegisterInterviewRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @ApiProperty({ minLength: 2, example: 'titulo de Entrevista' })
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @ApiProperty({ example: 'Descripcion de Entrevista' })
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @ApiProperty({ example: 'Descripcion de Entrevista' })
  readonly date: Date;

}

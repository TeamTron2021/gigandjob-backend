import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class AuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
    example: 'perez@mail.com',
  })
  email: string;
  @ApiProperty({
    minLength: 8,
    example: '12345678',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

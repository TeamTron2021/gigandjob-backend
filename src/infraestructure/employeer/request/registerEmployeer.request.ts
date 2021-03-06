import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export default class RegisterEmployeerRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @ApiProperty({ minLength: 2, example: 'Empresas Polar' })
  readonly companyName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'EmpresasPolar@polar.com' })
  readonly companyMail: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^J-\d\d\d\d\d\d\d\d-\d$/i, { message: 'El rif no es valido' })
  @ApiProperty({ example: 'J-27784169-4' })
  readonly rif: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/, {
    message: 'La latitud tiene que ser valida',
  })
  @ApiProperty({ example: '+90.0, -127.554334' })
  readonly latitude: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/, {
    message: 'La longitud tiene que ser valida',
  })
  @ApiProperty({ example: '47.1231231, 179.99999999' })
  readonly longitude: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @ApiProperty({ minLength: 2, example: 'Alimenticia' })
  readonly industry: string;
}

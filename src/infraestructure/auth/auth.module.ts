import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQueryDao } from 'src/modules/user/user-query.dao';
import { AuthController } from './controllers/auth.controller';
import AuthUserRepository from './users/repositories/user-auth.repository';
import { AuthUserService } from './users/services/auth-user.service';
import { JwtStrategy } from './users/strategies/jwt-user.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    ConfigModule,
    TypeOrmModule.forFeature([AuthUserRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthUserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

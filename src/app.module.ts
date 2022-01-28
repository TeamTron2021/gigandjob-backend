import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from './config/config.schema';
import { EmployeerModule } from './infraestructure/employeer/employeer.module';
import { EmployeerRepository } from './infraestructure/employeer/repositories/EntityRepository.repository';
import { JobOfferModule } from './infraestructure/job-offer/job-offer.module';
import { JobOfferRepository } from './infraestructure/job-offer/repositories/JobOfferRepository.repository';
import { UserModule } from './modules/user/user.module';
import { NotificationModule } from './modules/notification/notification.module';
import { UserQuery } from './modules/user/user-query.entity';
import { UserCommand } from './modules/user/user-command.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    CqrsModule,
    TypeOrmModule.forFeature([EmployeerRepository]),
    TypeOrmModule.forFeature([JobOfferRepository]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_USER_HOST'),
        port: configService.get('DB_USER_PORT'),
        username: configService.get('DB_USER_USER'),
        password: configService.get('DB_USER_PASSWORD'),
        database: configService.get('DB_USER_DATABASE'),
        entities: [UserQuery, UserCommand],
        synchronize: true,
      }),
    }),

    EmployeerModule,
    JobOfferModule,
    UserModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from './config/config.schema';
import { EmployeerModule } from './infraestructure/employeer/employeer.module';
import { EmployeerRepository } from './infraestructure/employeer/repositories/Employeer.repository';
import { InterviewModule } from './infraestructure/job-offer/interview.module';
import { JobOfferModule } from './infraestructure/job-offer/job-offer.module';
import { PostulationModule } from './infraestructure/job-offer/postulation.module';
import { InterviewRepository } from './infraestructure/job-offer/repositories/InterviewRepository.repository';
import { JobOfferRepository } from './infraestructure/job-offer/repositories/JobOfferRepository.repository';
import PostulationRepository from './infraestructure/job-offer/repositories/postulationRepository.repository';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    CqrsModule,
    TypeOrmModule.forFeature([EmployeerRepository]),
    TypeOrmModule.forFeature([JobOfferRepository]),
    TypeOrmModule.forFeature([PostulationRepository]),
    TypeOrmModule.forFeature([InterviewRepository]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';
        return {
          ssl: isProduction,
          extra: {
            ssl: { rejectUnauthorized: isProduction ? false : null },
          },
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    EmployeerModule,
    JobOfferModule,
    PostulationModule,
    InterviewModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

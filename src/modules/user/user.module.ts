import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/application/user/User.service';
import { UserQueryListener } from './handlers/user-query.handler';
import { UserRegisteredHandler } from './handlers/user-registered.handler';
import { UserCommandDao } from './user-command.dao';
import { UserCommandEntity } from './user-command.entity';
import { UserQueryDao } from './user-query.dao';
import { UserQueryEntity } from './user-query.entity';
import { UserController } from './user.controller';
import { UserPublisher } from './user.publisher';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCommandDao, UserQueryDao]),
    CqrsModule,
  ],
  providers: [
    UserRepository,
    UserPublisher,
    UserRegisteredHandler,
    UserQueryListener,
    {
      provide: UserService,
      useFactory: (publisher: UserPublisher, repository: UserRepository) =>
        new UserService(repository, publisher),
      inject: [UserPublisher, UserRepository],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}

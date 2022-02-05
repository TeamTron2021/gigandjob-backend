import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/application/user/User.service';
import { UserQueryListener } from './handlers/user-query.handler';
import { UserRegisteredHandler } from './handlers/user-registered.handler';
import { UserCommandDao } from './user-command.dao';
import { UserQueryDao } from './user-query.dao';
import { UserController } from './user.controller';
import { UserPublisher } from './user.publisher';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserCommandDao, UserQueryDao]),
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

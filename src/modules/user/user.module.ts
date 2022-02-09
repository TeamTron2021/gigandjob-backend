import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/application/user/User.service';
import { UserAccountDeletedHandler } from './handlers/user-deleted.handler';
import { UserQueryListener } from './handlers/user-query.handler';
import { UserReactivatedHandler } from './handlers/user-reactivated.handler';
import { UserRegisteredHandler } from './handlers/user-registered.handler';
import { UserSuspendedHandler } from './handlers/user-suspended.handler';
import { UserDataUpdatedHandler } from './handlers/user-updated.handler';
import { UserCommandDao } from './user-command.dao';
import { UserQueryDao } from './user-query.dao';
import { UserController } from './user.controller';
import { UserPublisher } from './user.publisher';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserCommandDao, UserQueryDao, UserRepository]),
  ],
  providers: [
    UserPublisher,
    UserRegisteredHandler,
    UserDataUpdatedHandler,
    UserAccountDeletedHandler,
    UserSuspendedHandler,
    UserReactivatedHandler,
    UserQueryListener,
    {
      provide: UserService,
      useFactory: (publisher: UserPublisher, repository: UserRepository) => {
        return new UserService(repository, publisher);
      },

      inject: [UserPublisher, UserRepository],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}

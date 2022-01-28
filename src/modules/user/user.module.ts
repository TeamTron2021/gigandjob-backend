import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/application/user/User.service';
import { UserCommand } from './user-command.entity';
import { UserQuery } from './user-query.entity';
import { UserController } from './user.controller';
import { UserPublisher } from './user.publisher';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuery, UserCommand])],
  providers: [
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

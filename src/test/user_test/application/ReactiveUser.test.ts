import { UserRepository } from '../../../application/user/User.repository';
import { UserPublisher } from '../../../application/user/User.publisher';
import { UserService } from '../../../application/user/User.service';
import { randomUUID } from 'crypto';
import { UserFirstName } from 'src/domain/user/value_objects/UserFirstName.value';
import { UserLastName } from 'src/domain/user/value_objects/UserLastName.value';
import { UserEmail } from 'src/domain/user/value_objects/UserEmail.value';
import { UserPassword } from 'src/domain/user/value_objects/UserPassword.value';
import { UserStatus } from 'src/domain/user/enums/UserStatus.enum';
import { UserID } from 'src/domain/user/value_objects/UserID.value';
import { User } from 'src/domain/user/User.aggregate';
import { UserBirthday } from 'src/domain/user/value_objects/UserBirthday.value';
import { UserDto } from 'src/application/user/User.dto';
import { ReactiveUser } from 'src/application/user/commands/ReactiveUser.command';
import { UserReactivated } from 'src/domain/user/domain_events/UserReactivated.event';

describe('Reactivate User', () => {
  const mockPublishFn = jest.fn().mockImplementation();
  let publisher: UserPublisher = {
    publish: mockPublishFn,
  };
  let mockUserID: string = randomUUID();
  let mockUser: User<UserStatus> = new User(
    new UserFirstName('Jotaro'),
    new UserLastName('Kujoh'),
    new UserBirthday(new Date(1970, 2, 3)),
    new UserEmail('jotaro-kujoh@joestar.com'),
    new UserPassword('star-platinum'),
    UserStatus.Supended,
    new UserID(mockUserID),
  );
  let mockUserDto: UserDto = {
    ID: mockUserID,
    firstname: 'Jotaro',
    lastname: 'Kujoh',
    birthday: new Date(1970, 2, 3),
    email: 'jotaro-kujoh@joestar.com',
    status: UserStatus[2],
  };
  let mockGetAllFn = jest.fn();
  let mockGetFn = jest.fn().mockImplementation((uuid) => mockUserDto);
  let mockGetUserWithStatusFn = jest
    .fn()
    .mockImplementation((uuid, options) => mockUser);
  let mockGetUserFn = jest.fn().mockImplementation((uuid) => mockUser);
  let repository: UserRepository = {
    get: mockGetFn,
    getAll: mockGetAllFn,
    getUser: mockGetUserFn,
    getUserWithStatus: mockGetUserWithStatusFn,
  };
  let service: UserService = new UserService(repository, publisher);
  test('Should reactive user account', async () => {
    const command: ReactiveUser = new ReactiveUser(mockUserID);
    await command.execute(service);
    expect(mockPublishFn.mock.calls[0][0][0]).toBeInstanceOf(UserReactivated);
  });
});

import { UserRepository } from '../../../application/user/User.repository';
import { UserPublisher } from '../../../application/user/User.publisher';
import { UserService } from '../../../application/user/User.service';
import { RegisterUser } from '../../../application/user/commands/RegisterUser.command';
import { UserRegistered } from '../../../domain/user/domain_events/UserRegistered.event';

describe('Register User', () => {
  let mockPublishFn = jest.fn();
  let publisher: UserPublisher = {
    publish: mockPublishFn,
  };
  let repository: UserRepository;
  let service: UserService = new UserService(repository, publisher);

  test('Should register user', () => {
    const command: RegisterUser = new RegisterUser(
      'Jotaro',
      'Kujoh',
      new Date(1970, 2, 3),
      'jotaro-kujoh@joestar.com',
      'star-platinum',
    );

    command.execute(service);
    expect(mockPublishFn.mock.calls[0][0][0]).toBeInstanceOf(UserRegistered);
  });
});

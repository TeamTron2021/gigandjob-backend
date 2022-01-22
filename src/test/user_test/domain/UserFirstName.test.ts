import { UserFirstNameEmpty } from '../../../domain/user/errors/UserFirstNameEmpty.error';
import { UserFirstName } from '../../../domain/user/value_objects/UserFirstName.value';

describe('Value Object UserFirstName', () => {
  test('Should response a error: UserFirstNameEmpty', () => {
    const firstname: any = null;
    expect(() => new UserFirstName(firstname)).toThrowError(
      new UserFirstNameEmpty(),
    );
  });
  test('Should return a error: UserFirstNameEmpty', () => {
    const firstname: any = undefined;
    expect(() => new UserFirstName(firstname)).toThrowError(
      new UserFirstNameEmpty(),
    );
  });
  test('Should return a error: UserFirstNameEmpty', () => {
    expect(() => new UserFirstName('')).toThrowError(new UserFirstNameEmpty());
  });
  test('Should return a error: UserFirstNameEmpty', () => {
    expect(() => new UserFirstName('  ')).toThrowError(
      new UserFirstNameEmpty(),
    );
  });
  test('Should return a correct UserFirstName', () => {
    expect(new UserFirstName('Jolyne')).toBeInstanceOf(UserFirstName);
  });
});

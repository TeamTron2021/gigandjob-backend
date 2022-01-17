import { UserPasswordEmpty } from '../../../src/domain/user/errors/UserPasswordEmpty.error';
import { UserPasswordTooShort } from '../../../src/domain/user/errors/UserPasswordTooShort.error';
import { UserPassword } from '../../../src/domain/user/value_objects/UserPassword.value';

describe('Value Object UserPassword', () => {
  test('Should return a error: UserPasswordEmpty', () => {
    const password: any = null;
    expect(() => new UserPassword(password)).toThrowError(
      new UserPasswordEmpty(),
    );
  });
  test('Should return a error: UserPasswordEmpty', () => {
    const password: any = undefined;
    expect(() => new UserPassword(password)).toThrowError(
      new UserPasswordEmpty(),
    );
  });
  test('Should return a error: UserPasswordEmpty', () => {
    expect(() => new UserPassword('')).toThrowError(new UserPasswordEmpty());
  });
  test('Should return a error: UserPasswordEmpty', () => {
    expect(() => new UserPassword('  ')).toThrowError(new UserPasswordEmpty());
  });
  test('Should return a error: UserPasswordTooShort', () => {
    expect(() => new UserPassword('Dio')).toThrowError(
      new UserPasswordTooShort(),
    );
  });
  test('Should return a correct UserFirstName', () => {
    expect(new UserPassword('DioBrando')).toBeInstanceOf(UserPassword);
  });
});

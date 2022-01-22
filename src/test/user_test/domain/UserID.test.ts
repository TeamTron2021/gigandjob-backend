import { randomUUID } from 'crypto';
import { UserIdEmpty } from '../../../domain/user/errors/UserIdEmpty.error';
import { UserID } from '../../../domain/user/value_objects/UserID.value';

describe('Value Object UserID', () => {
  test('Should return a error: UserIDEmpty', () => {
    const id: any = null;
    expect(() => new UserID(id)).toThrowError(new UserIdEmpty());
  });
  test('Should return a error: UserIDEmpty', () => {
    const id: any = undefined;
    expect(() => new UserID(id)).toThrowError(new UserIdEmpty());
  });
  test('Should return a error: UserIdEmpty', () => {
    expect(() => new UserID('')).toThrowError(new UserIdEmpty());
  });
  test('Should return a error: UserIdEmpty', () => {
    expect(() => new UserID('  ')).toThrowError(new UserIdEmpty());
  });
  test('Should return a correct UserID', () => {
    expect(new UserID(randomUUID())).toBeInstanceOf(UserID);
  });
});

import { UserLastNameEmpty } from '../../../domain/user/errors/UserLastNameEmpty.error';
import { UserLastName } from '../../../domain/user/value_objects/UserLastName.value';

describe('Value Object UserLastName', () => {
  test('Should return a error: UserLastNameEmpty', () => {
    const lastname: any = null;
    expect(() => new UserLastName(lastname)).toThrowError(
      new UserLastNameEmpty(),
    );
  });
  test('Should return a error: UserLastNameEmpty', () => {
    const lastname: any = undefined;
    expect(() => new UserLastName(lastname)).toThrowError(
      new UserLastNameEmpty(),
    );
  });
  test('Should return a error: UserLastNameEmpty', () => {
    expect(() => new UserLastName('')).toThrowError(new UserLastNameEmpty());
  });
  test('Should return a error: UserLastNameEmpty', () => {
    expect(() => new UserLastName('  ')).toThrowError(new UserLastNameEmpty());
  });
  test('Should return a correct UserLastName', () => {
    expect(new UserLastName('Kujo')).toBeInstanceOf(UserLastName);
  });
});

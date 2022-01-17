import { randomUUID } from 'crypto';
import { NotificationIdEmpty } from '../../../src/domain/notification/errors/NotificationIdEmpty.error';
import { NotificationID } from '../../../src/domain/notification/values_objects/NotificationID.value';

describe('Value Object NotificationID', () => {
  test('Should return a error: NotificationIdEmpty', () => {
    const id: any = null;
    expect(() => new NotificationID(id)).toThrowError(
      new NotificationIdEmpty(),
    );
  });
  test('Should return a error: NotificationIdEmpty', () => {
    const id: any = undefined;
    expect(() => new NotificationID(id)).toThrowError(
      new NotificationIdEmpty(),
    );
  });
  test('Should return a error: NotificationIdEmpty', () => {
    expect(() => new NotificationID('')).toThrowError(
      new NotificationIdEmpty(),
    );
  });
  test('Should return a error: NotificationIdEmpty', () => {
    expect(() => new NotificationID('  ')).toThrowError(
      new NotificationIdEmpty(),
    );
  });
  test('Should return a correct NotificationID', () => {
    expect(new NotificationID(randomUUID())).toBeInstanceOf(NotificationID);
  });
});

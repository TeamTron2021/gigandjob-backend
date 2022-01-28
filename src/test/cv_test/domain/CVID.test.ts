import { randomUUID } from 'crypto';
import { CVIdEmpty } from '../../domain/user/errors/CVIDEmpty.error';
import CVID from '../../domain/user/value_objects/CVID.value';
describe('Value Object CVID', () => {
  test('Should return a error: CVIDEmpty', () => {
    const id: any = null;
    expect(() => CVID.create(id)).toThrowError(new CVIdEmpty());
  });
  test('Should return a error: CVIDEmpty', () => {
    const id: any = undefined;
    expect(() => CVID.create(id)).toThrowError(new CVIdEmpty());
  });
  test('Should return a error: CVIdEmpty', () => {
    expect(() => CVID.create('')).toThrowError(new CVIdEmpty());
  });
  test('Should return a error: CVIdEmpty', () => {
    expect(() => CVID.create('  ')).toThrowError(new CVIdEmpty());
  });
  test('Should return a correct CVID', () => {
    expect(new CVID(randomUUID())).toBeInstanceOf(CVID);
  });
});

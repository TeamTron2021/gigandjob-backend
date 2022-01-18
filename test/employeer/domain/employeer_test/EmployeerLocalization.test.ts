import EmployeerEmptyLocalizationException from '../../../../src/domain/employeer/exceptions/employeer/EmployeerEmptyLocalizationException';
import EmployeerLocalization from '../../../../src/domain/employeer/value-objects/employeer/EmployeerLocalization';

describe('Testing EmployeerLocalization value object', () => {
  it('Should throw an emptyLocalization error', () => {
    const latitude: any = null;
    const longitude = '+90.0, -127.554334';
    expect(() => EmployeerLocalization.create(latitude, longitude)).toThrow(
      new EmployeerEmptyLocalizationException('La latitud no debe estar vacia'),
    );
  });
  it('Should throw an emptyLocalization error', () => {
    const latitude: any = '+90.0, -127.554334';
    const longitude: any = undefined;
    expect(() => EmployeerLocalization.create(latitude, longitude)).toThrow(
      new EmployeerEmptyLocalizationException(
        'La longitud no debe estar vacia',
      ),
    );
  });
  it('Should return a EmployeerLocalization instance', () => {
    const latitude: any = '+90.0, -127.554334';
    const longitude: any = '47.1231231, 179.99999999';
    const employeerLocalization = EmployeerLocalization.create(
      latitude,
      longitude,
    );
    const isEmployeerLocalization =
      employeerLocalization instanceof EmployeerLocalization;
    expect(isEmployeerLocalization).toBe(true);
  });
});

import EmployeerEmptyCompanyNameException from '../../../../src/domain/employeer/exceptions/employeer/EmployeerEmptyCompanyNameException';
import EmployeerCompanyName from '../../../../src/domain/employeer/value-objects/employeer/EmployeerCompanyName';

describe('Testing company name value object', () => {
  it('Should throw an empty company name error', () => {
    const name: any = null;
    expect(() => EmployeerCompanyName.create(name)).toThrow(
      new EmployeerEmptyCompanyNameException(
        'El nombre de la empresa empleadora no puede estar vacio',
      ),
    );
  });
  it('Should throw an empty company name error', () => {
    const name: any = '           ';
    expect(() => EmployeerCompanyName.create(name)).toThrow(
      new EmployeerEmptyCompanyNameException(
        'El nombre de la empresa empleadora no puede estar vacio',
      ),
    );
  });
  it('Should throw an empty company name error', () => {
    const name: any = undefined;
    expect(() => EmployeerCompanyName.create(name)).toThrow(
      new EmployeerEmptyCompanyNameException(
        'El nombre de la empresa empleadora no puede estar vacio',
      ),
    );
  });
  it('Should return an EmployeerCompanyName instance', () => {
    const name = 'Empresas Polar';
    const companyName = EmployeerCompanyName.create(name);
    const isCompanyName = companyName instanceof EmployeerCompanyName;
    expect(isCompanyName).toBe(true);
  });
});

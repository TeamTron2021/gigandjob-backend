import EmployeerEmptyCompanyMailException from '../../../../domain/employeer/exceptions/employeer/EmployeerEmptyCompanyMailException';
import EmployeerInvalidCompanyMailException from '../../../../domain/employeer/exceptions/employeer/EmployeerInvalidCompanyMailException';
import EmployeerCompanyMail from '../../../../domain/employeer/value-objects/employeer/EmployeerCompanyMail';

describe('Testing companyMail value object', () => {
  it('Should throw an empty companymail error', () => {
    const mail: any = null;
    expect(() => EmployeerCompanyMail.create(mail)).toThrow(
      new EmployeerEmptyCompanyMailException(
        'El email del empleador no puede estar vacio',
      ),
    );
  });
  it('Should throw an invalid companyMail error', () => {
    const mail = 'perez@com';
    expect(() => EmployeerCompanyMail.create(mail)).toThrow(
      new EmployeerInvalidCompanyMailException(
        'El formato no coincide con un email',
      ),
    );
  });
  it('Should throw an empty companymail error', () => {
    const mail: any = '     ';
    expect(() => EmployeerCompanyMail.create(mail)).toThrow(
      new EmployeerEmptyCompanyMailException(
        'El email del empleador no puede estar vacio',
      ),
    );
  });
  it('Should return an EmployeerCompanyMail instance', () => {
    const mail = 'perez@gmail.com';
    const companyMail = EmployeerCompanyMail.create(mail);
    const isCompanyMail = companyMail instanceof EmployeerCompanyMail;
    expect(isCompanyMail).toBe(true);
  });
});

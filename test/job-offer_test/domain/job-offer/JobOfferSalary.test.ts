import JobOfferInvalidSalaryException from '../../../../src/domain/job-offer/exceptions/JobOffer/JobOfferInvalidSalaryException';
import JobOfferLowSalaryException from '../../../../src/domain/job-offer/exceptions/JobOffer/JobOfferLowSalaryException';
import JobOfferSalary from '../../../../src/domain/job-offer/value-objects/JobOffer/JobOfferSalary';

describe('Testing value object JobOfferSalary', () => {
  it('Should throw a low salary error', () => {
    expect(() => JobOfferSalary.create(-1000)).toThrowError(
      new JobOfferLowSalaryException('El salario tiene que ser mayor que 0'),
    );
  });
  it('Should throw an Invalid salary error', () => {
    const salary: any = undefined;
    expect(() => JobOfferSalary.create(salary)).toThrowError(
      new JobOfferInvalidSalaryException('El salario no puede estar vacio'),
    );
  });
  it('Should return an instance of JobOfferSalary', () => {
    const salary = 16000000;
    const jobSalary = JobOfferSalary.create(salary);
    const isJobSalary = jobSalary instanceof JobOfferSalary;
    expect(isJobSalary).toBe(true);
  });
});

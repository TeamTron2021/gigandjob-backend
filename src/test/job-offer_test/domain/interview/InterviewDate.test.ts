import InterviewInvalidDateException from '../../../../domain/job-offer/exceptions/Interview/Interview/InterviewInvalidDateException';
import InterviewMissingDateException from '../../../../domain/job-offer/exceptions/Interview/Interview/InterviewMissingDateException';
import InterviewDate from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate';

describe('Testing value object InterviewDate', () => {
  it('Should throw an missing date error', () => {
    const initialDate: any = undefined;
    expect(() => InterviewDate.create(initialDate)).toThrow(
      new InterviewMissingDateException('La fecha de inicio no puede estar vacia '),
    );
  });

  it('Should throw an invalid date error', () => {
    const initialDate = new Date();
    initialDate.setDate(initialDate.getDate() - 3);
    expect(() => InterviewDate.create(initialDate)).toThrow(
      new InterviewInvalidDateException(
        'La fecha de inicio no puede ser menor a la fecha actual',
      ),
    );
  });

  it('Should return an instance of InterviewDate ', () => {
    const initialDate = new Date();
    const date = InterviewDate.create(initialDate);
    const isDate = date instanceof InterviewDate;
    expect(isDate).toBe(true);
  });
});

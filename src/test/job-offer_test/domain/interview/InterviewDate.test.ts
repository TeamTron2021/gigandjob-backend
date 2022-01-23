import InterviewInvalidDateException from '../../../../domain/job-offer/exceptions/Interview/Interview/InterviewInvalidDateException';
import InterviewMissingDateException from '../../../../domain/job-offer/exceptions/Interview/Interview/InterviewMissingDateException';
import InterviewDate from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate';

describe('Testing value object InterviewDate', () => {
  it('Should throw an missing date error', () => {
    const initialDate = new Date();
    const finalDate: any = undefined;
    expect(() => InterviewDate.create(initialDate, finalDate)).toThrow(
      new InterviewMissingDateException('La fecha final no puede estar vacia '),
    );
  });

  it('Should throw an invalid date error', () => {
    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() + 1);
    expect(() => InterviewDate.create(initialDate, finalDate)).toThrow(
      new InterviewInvalidDateException(
        'La fecha de inicio no puede ser mayor a la fecha final',
      ),
    );
  });

  it('Should return an instance of InterviewDate ', () => {
    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = InterviewDate.create(initialDate, finalDate);
    const isDate = date instanceof InterviewDate;
    expect(isDate).toBe(true);
  });
});

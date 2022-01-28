import EmptyInterviewPostulationException from '../../../../domain/job-offer/exceptions/Interview/Interview/InterviewEmptyIdException';
import InterviewPostulation from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewPostulation';
import UniqueId from '../../../../shared/domain/UniqueUUID';

describe('Testing value object InterviewPostulation', () => {
  it('should throw empty id error', () => {
    const id = ' ';
    expect(() => InterviewPostulation.create(id)).toThrowError(
      new EmptyInterviewPostulationException(
        'El Id de la postulacion no puede estar vacio',
      ),
    );
  });
  it('should throw empty id error', () => {
    const id: any = null;
    expect(() => InterviewPostulation.create(id)).toThrowError(
      new EmptyInterviewPostulationException(
        'El Id de la postulacion no puede estar vacio',
      ),
    );
  });
  it('should return a InterviewPostulation instance', () => {
    const id = new UniqueId().getId();
    const interviewPostulation = InterviewPostulation.create(id);
    const isInterviewPostulation =
      interviewPostulation instanceof InterviewPostulation;
    expect(isInterviewPostulation).toBe(true);
  });
});

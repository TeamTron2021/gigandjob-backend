import EmptyInterviewIdException from '../../../../domain/job-offer/exceptions/Interview/Interview/InterviewEmptyIdException';
import InterviewId from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewId';
import UniqueId from '../../../../shared/domain/UniqueUUID';

describe('Testing value object InterviewId', () => {
  it('should throw empty id error', () => {
    const id = ' ';
    expect(() => InterviewId.create(id)).toThrowError(
      new EmptyInterviewIdException(
        'El id de la entrevista no puede estar vacio',
      ),
    );
  });
  it('should throw empty id error', () => {
    const id: any = null;
    expect(() => InterviewId.create(id)).toThrowError(
      new EmptyInterviewIdException(
        'El id de la entrevista no puede estar vacio',
      ),
    );
  });
  it('should return a InterviewId instance', () => {
    const id = new UniqueId().getId();
    const interviewId = InterviewId.create(id);
    const isInterviewId = interviewId instanceof InterviewId;
    expect(isInterviewId).toBe(true);
  });
});

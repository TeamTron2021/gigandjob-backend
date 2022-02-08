import Interview from '../../../../../domain/job-offer/entities/Interview';
import InterviewCurrentlyDisabledException from '../../../../../domain/job-offer/exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException';
import { InterviewStatus } from '../../../../../domain/job-offer/shared/InterviewStatus.enum';
import InterviewDate from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate';
import InterviewDescription from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription';
import InterviewId from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewId';
import InterviewTitle from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle';
import UniqueId from '../../../../../shared/domain/UniqueUUID';

describe('Testing Interview creation', () => {
  it('Should return a Interview instance', () => {
    const initialDate = new Date();
    const date = InterviewDate.create(initialDate);
    const id = InterviewId.create(new UniqueId().getId());
    const interview = Interview.create(
      InterviewTitle.create('Titulo generico de una entrevista'),
      InterviewDescription.create(
        'Descripcion generica de una entrevista de trabajo',
      ),
      date,
      id,
    );
    expect(interview).toBeInstanceOf(Interview);
  });
  it('Should update the interview status to rescheduled', () => {
    const initialDate = new Date();
    const date = InterviewDate.create(initialDate);
    const id = InterviewId.create(new UniqueId().getId());
    const interview = Interview.create(
      InterviewTitle.create('Titulo generico de una entrevista'),
      InterviewDescription.create(
        'Descripcion generica de una entrevista de trabajo',
      ),
      date,
      id,
    );

    expect(interview.status).toBe(InterviewStatus.created);

    expect(interview.rescheduledInterview().status).toBe(
      InterviewStatus.rescheduled,
    );
  });
});

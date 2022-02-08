import OnlineInterview from '../../../../../../domain/job-offer/entities/OnlineInterview';
import { InterviewStatus } from '../../../../../../domain/job-offer/shared/InterviewStatus.enum';
import OnlineInterviewUrlMeeting from '../../../../../../domain/job-offer/value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting';
import InterviewDate from '../../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate';
import InterviewDescription from '../../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription';
import InterviewId from '../../../../../../domain/job-offer/value-objects/Interview/interview/InterviewId';
import InterviewTitle from '../../../../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle';
import UniqueId from '../../../../../../shared/domain/UniqueUUID';

describe('Testing Interview creation', () => {
  it('Should return a Interview instance', () => {
    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = InterviewDate.create(initialDate);
    const id = InterviewId.create(new UniqueId().getId());
    const interview = OnlineInterview.create(
      InterviewTitle.create('Titulo generico de una entrevista'),
      InterviewDescription.create(
        'Descripcion generica de una entrevista de trabajo',
      ),
      date,
      id,
      OnlineInterviewUrlMeeting.create('URL generica de una entrevista'),
    );
    expect(interview).toBeInstanceOf(OnlineInterview);
  });
  it('Should update the interview status to rescheduled', () => {
    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = InterviewDate.create(initialDate);
    const id = InterviewId.create(new UniqueId().getId());
    const interview = OnlineInterview.create(
      InterviewTitle.create('Titulo generico de una entrevista'),
      InterviewDescription.create(
        'Descripcion generica de una entrevista de trabajo',
      ),
      date,
      id,
      OnlineInterviewUrlMeeting.create('URL generica de una entrevista'),
    );

    expect(interview.status).toBe(InterviewStatus.created);

    expect(interview.rescheduledInterview().status).toBe(
      InterviewStatus.rescheduled,
    );
  });
});

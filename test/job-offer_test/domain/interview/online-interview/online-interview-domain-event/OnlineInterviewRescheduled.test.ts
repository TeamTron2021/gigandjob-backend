import OnlineInterview from '../../../../../../src/domain/job-offer/entities/OnlineInterview';
import { InterviewStatus } from '../../../../../../src/domain/job-offer/shared/InterviewStatus.enum';
import OnlineInterviewUrlMeeting from '../../../../../../src/domain/job-offer/value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting';
import InterviewDate from '../../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewDate';
import InterviewDescription from '../../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewDescription';
import InterviewId from '../../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewId';
import InterviewInterviewed from '../../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewInterviewed';
import InterviewInterviewer from '../../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewInterviewer';
import InterviewTitle from '../../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewTitle';
import UniqueId from '../../../../../../src/shared/domain/UniqueUUID';

describe('Testing Interview creation', () => {
  it('Should return a Interview instance', () => {
    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = InterviewDate.create(initialDate, finalDate);
    const id = InterviewId.create(new UniqueId().getId());
    const interviewed = InterviewInterviewed.create(new UniqueId().getId());
    const interviewer = InterviewInterviewer.create(new UniqueId().getId());
    const interview = OnlineInterview.create(
      InterviewTitle.create('Titulo generico de una entrevista'),
      InterviewDescription.create(
        'Descripcion generica de una entrevista de trabajo',
      ),
      date,
      interviewed,
      interviewer,
      id,
      OnlineInterviewUrlMeeting.create('URL generica de una entrevista'),
    );
    expect(interview).toBeInstanceOf(OnlineInterview);
  });
  it('Should update the interview status to rescheduled', () => {
    const initialDate = new Date();
    const finalDate = new Date();
    initialDate.setDate(finalDate.getDate() - 1);
    const date = InterviewDate.create(initialDate, finalDate);
    const id = InterviewId.create(new UniqueId().getId());
    const interviewed = InterviewInterviewed.create(new UniqueId().getId());
    const interviewer = InterviewInterviewer.create(new UniqueId().getId());
    const interview = OnlineInterview.create(
      InterviewTitle.create('Titulo generico de una entrevista'),
      InterviewDescription.create(
        'Descripcion generica de una entrevista de trabajo',
      ),
      date,
      interviewed,
      interviewer,
      id,
      OnlineInterviewUrlMeeting.create('URL generica de una entrevista'),
    );

    expect(interview.status).toBe(InterviewStatus.created);

    expect(interview.rescheduledInterview().status).toBe(
      InterviewStatus.rescheduled,
    );
  });
});

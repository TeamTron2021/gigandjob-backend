import OnlineInterview from '../../../../../src/domain/job-offer/entities/OnlineInterview';
import InterviewDate from '../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewDate';
import InterviewDescription from '../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewDescription';
import InterviewId from '../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewId';
import InterviewInterviewed from '../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewInterviewed';
import InterviewInterviewer from '../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewInterviewer';
import InterviewTitle from '../../../../../src/domain/job-offer/value-objects/Interview/interview/InterviewTitle';
import OnlineInterviewUrlMeeting from '../../../../../src/domain/job-offer/value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting';
import UniqueId from '../../../../../src/shared/domain/UniqueUUID';
import { InterviewStatus } from '../../../../../src/domain/job-offer/shared/InterviewStatus.enum';

const initialDate = new Date();
const finalDate = new Date();
initialDate.setDate(finalDate.getDate() - 1);
const date = InterviewDate.create(initialDate, finalDate);

const id = InterviewId.create(new UniqueId().getId());
const interviewed = InterviewInterviewed.create(new UniqueId().getId());
const interviewer = InterviewInterviewer.create(new UniqueId().getId());
const interviewTitle = InterviewTitle.create(
  'Titulo genérico de una entrevista',
);
const interviewDescription = InterviewDescription.create(
  'Descripción genérica de una entrevista de trabajo',
);
const interviewUrlMeeting = OnlineInterviewUrlMeeting.create(
  'Url genérica de una entrevista online',
);

describe('Testing Interview creation', () => {
  it('Should return a Interview instance', () => {
    const onlineInterview = OnlineInterview.create(
      interviewTitle,
      interviewDescription,
      date,
      interviewed,
      interviewer,
      id,
      interviewUrlMeeting,
    );
    expect(onlineInterview).toBeInstanceOf(OnlineInterview);
  });

  test('Should throws an interview currently disabled error', () => {
    const interview = new OnlineInterview(
      interviewTitle,
      interviewDescription,
      date,
      interviewed,
      interviewer,
      InterviewStatus.disabled,
      id,
      interviewUrlMeeting,
    );

    expect(() => {
      interview.acceptInterview();
    }).toThrow();
  });

  test('Should change the interview status from "created" to "accepted', () => {
    const interview = OnlineInterview.create(
      interviewTitle,
      interviewDescription,
      date,
      interviewed,
      interviewer,
      id,
      interviewUrlMeeting,
    );
    interview.acceptInterview();
    const newInterviewStatus = interview.status;
    const expectedInterviewStatus = InterviewStatus.accepted;

    expect(newInterviewStatus).toBe(expectedInterviewStatus);
  });

  test('Should throws an interview currently disabled error', () => {
    const interview = new OnlineInterview(
      interviewTitle,
      interviewDescription,
      date,
      interviewed,
      interviewer,
      InterviewStatus.disabled,
      id,
      interviewUrlMeeting,
    );

    expect(() => {
      interview.rejectInterview();
    }).toThrow();
  });

  test('Should update the interview status to rejected', () => {
    const interview = OnlineInterview.create(
      interviewTitle,
      interviewDescription,
      date,
      interviewed,
      interviewer,
      id,
      interviewUrlMeeting,
    );
    interview.rejectInterview();
    const interviewStatus = interview.status;
    const statusExpected = InterviewStatus.rejected;

    expect(interviewStatus).toBe(statusExpected);
  });
});

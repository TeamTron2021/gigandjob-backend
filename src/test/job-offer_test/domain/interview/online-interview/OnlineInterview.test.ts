import OnlineInterview from '../../../../../domain/job-offer/entities/OnlineInterview';
import InterviewDate from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate';
import InterviewDescription from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription';
import InterviewId from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewId';
import InterviewInterviewed from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewInterviewed';
import InterviewJobOffer from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewJobOffer';
import InterviewTitle from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle';
import OnlineInterviewUrlMeeting from '../../../../../domain/job-offer/value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting';
import UniqueId from '../../../../../shared/domain/UniqueUUID';
import { InterviewStatus } from '../../../../../domain/job-offer/shared/InterviewStatus.enum';

const initialDate = new Date();
const finalDate = new Date();
initialDate.setDate(finalDate.getDate() - 1);
const date = InterviewDate.create(initialDate, finalDate);

const id = InterviewId.create(new UniqueId().getId());
const interviewed = InterviewInterviewed.create(new UniqueId().getId());
const jobOffer = InterviewJobOffer.create(new UniqueId().getId());
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
      jobOffer,
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
      jobOffer,
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
      jobOffer,
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
      jobOffer,
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
      jobOffer,
      id,
      interviewUrlMeeting,
    );
    interview.rejectInterview();
    const interviewStatus = interview.status;
    const statusExpected = InterviewStatus.rejected;

    expect(interviewStatus).toBe(statusExpected);
  });
});

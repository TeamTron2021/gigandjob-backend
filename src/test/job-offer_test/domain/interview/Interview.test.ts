import Interview from '../../../../domain/job-offer/entities/Interview';
import InterviewDate from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewDate';
import InterviewDescription from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewDescription';
import InterviewId from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewId';
import InterviewPostulation from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewPostulation';
import InterviewTitle from '../../../../domain/job-offer/value-objects/Interview/interview/InterviewTitle';
import UniqueId from '../../../../shared/domain/UniqueUUID';
import { InterviewStatus } from '../../../../domain/job-offer/shared/InterviewStatus.enum';

const initialDate = new Date();
const finalDate = new Date();
initialDate.setDate(finalDate.getDate() - 1);
const date = InterviewDate.create(initialDate, finalDate);

const id = InterviewId.create(new UniqueId().getId());
const postulation = InterviewPostulation.create(new UniqueId().getId());
const interviewTitle = InterviewTitle.create(
  'Titulo genérico de una entrevista',
);
const interviewDescription = InterviewDescription.create(
  'Descripción genérica de una entrevista de trabajo',
);

describe('Testing Interview creation', () => {
  it('Should return a Interview instance', () => {
    const interview = Interview.create(
      interviewTitle,
      interviewDescription,
      date,
      postulation,
      id,
    );
    expect(interview).toBeInstanceOf(Interview);
  });

  test('Should throws an interview currently disabled error', () => {
    const interview = new Interview(
      interviewTitle,
      interviewDescription,
      date,
      postulation,
      InterviewStatus.disabled,
      id,
    );

    expect(() => {
      interview.acceptInterview();
    }).toThrow();
  });

  test('Should change the interview status from "created" to "accepted', () => {
    const interview = Interview.create(
      interviewTitle,
      interviewDescription,
      date,
      postulation,
      id,
    );
    interview.acceptInterview();
    const newInterviewStatus = interview.status;
    const expectedInterviewStatus = InterviewStatus.accepted;

    expect(newInterviewStatus).toBe(expectedInterviewStatus);
  });

  test('Should change the interview status from "enable" to "disable', () => {
    const interview = Interview.create(
      interviewTitle,
      interviewDescription,
      date,
      postulation,
      id,
    );
    interview.disableInterview();
    const newInterviewStatus = interview.status;
    const expectedInterviewStatus = InterviewStatus.disabled;

    expect(newInterviewStatus).toBe(expectedInterviewStatus);
  });
});

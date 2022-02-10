import { InterviewStatus } from '../../../../../domain/job-offer/shared/InterviewStatus.enum';
import { IChangeInterviewStatus } from '../../../../../domain/job-offer/domain-service/interview/IChangeInterviewStatus';
import InterviewCurrentlyDisabledException from '../../../../../domain/job-offer/exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException';
import ChangeInterviewStatusToRescheduled from '../../../../../domain/job-offer/domain-service/interview/ChangeInterviewStatusToRescheduled';

describe('Domain Service ChangeInterviewStatusToAccepted Unit Tests', () => {
  const expectedInterviewStatus: InterviewStatus = InterviewStatus.rescheduled;

  test('Should throw an interview currently disabled error', () => {
    const originalInterviewStatus: InterviewStatus = InterviewStatus.disabled;

    const interviewStatusChanger: IChangeInterviewStatus =
      new ChangeInterviewStatusToRescheduled();

    expect(() => {
      interviewStatusChanger.changeStatus(originalInterviewStatus);
    }).toThrow(
      new InterviewCurrentlyDisabledException(
        'La entrevista está actualmente deshabilitada.',
      ),
    );
  });

  test('Should return "rescheduled" interview status, from "created"', () => {
    const originalInterviewStatus: InterviewStatus = InterviewStatus.created;

    const interviewStatusChanger: IChangeInterviewStatus =
      new ChangeInterviewStatusToRescheduled();
    const newInterviewStatus: InterviewStatus =
      interviewStatusChanger.changeStatus(originalInterviewStatus);

    expect(newInterviewStatus).toBe(expectedInterviewStatus);
  });
});

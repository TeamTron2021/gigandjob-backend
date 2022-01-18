import { ChangeInterviewStatusToDisable } from '../../../../../src/domain/job-offer/domain-service/interview/ChangeInterviewStatusToDisable';
import InterviewCurrentlyDisabledException from '../../../../../src/domain/job-offer/exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException';
import { InterviewStatus } from '../../../../../src/domain/job-offer/shared/InterviewStatus.enum';
import { IChangeInterviewStatus } from '../../../../../src/shared/domain/IRejectInterview';

describe('ChangeInterviewStatusToDisable Unit Tests', () => {
  const expectedInterviewStatus: InterviewStatus = InterviewStatus.disabled;

  test('Should throw an interview currently disabled error', () => {
    const originalInterviewStatus: InterviewStatus = InterviewStatus.disabled;

    const interviewStatusChanger: IChangeInterviewStatus =
      new ChangeInterviewStatusToDisable();

    expect(() => {
      interviewStatusChanger.changeStatus(originalInterviewStatus);
    }).toThrow(
      new InterviewCurrentlyDisabledException(
        'La entrevista está actualmente deshabilitada.',
      ),
    );
  });
});

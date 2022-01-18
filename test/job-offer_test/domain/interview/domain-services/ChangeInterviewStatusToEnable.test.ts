import { ChangeInterviewStatusToEnable } from '../../../../../src/domain/job-offer/domain-service/interview/ChangeInterviewStatusToEnable';
import InterviewCurrentlyEnabledException from '../../../../../src/domain/job-offer/exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyEnabledException';
import { InterviewStatus } from '../../../../../src/domain/job-offer/shared/InterviewStatus.enum';
import { IChangeInterviewStatus } from '../../../../../src/shared/domain/IRejectInterview';

describe('ChangeInterviewStatusToEnable Unit Tests', () => {
  const expectedInterviewStatus: InterviewStatus = InterviewStatus.enable;

  test('Should throw an interview currently disabled error', () => {
    const originalInterviewStatus: InterviewStatus = InterviewStatus.enable;

    const interviewStatusChanger: IChangeInterviewStatus =
      new ChangeInterviewStatusToEnable();

    expect(() => {
      return interviewStatusChanger.changeStatus(originalInterviewStatus);
    }).toThrow(
      new InterviewCurrentlyEnabledException(
        'La entrevista está actualmente habilitada.',
      ),
    );
  });
});

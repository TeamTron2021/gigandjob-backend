import { ChangeInterviewStatusToEnable } from "../../../../../domain/job-offer/domain-service/interview/ChangeInterviewStatusToEnable";
import InterviewCurrentlyEnabledException from "../../../../../domain/job-offer/exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyEnabledException";
import { InterviewStatus } from "../../../../../domain/job-offer/shared/InterviewStatus.enum";
import { IChangeInterviewStatus } from "../../../../../shared/domain/IRejectInterview";

describe('ChangeInterviewStatusToEnable Unit Tests', () => {
	const expectedInterviewStatus: InterviewStatus = InterviewStatus.disabled;
	
	test('Should throw an interview currently disabled error', () => {
		const originalInterviewStatus: InterviewStatus = InterviewStatus.disabled;
		
		let interviewStatusChanger: IChangeInterviewStatus = new ChangeInterviewStatusToEnable();
		
		expect(() => {
			interviewStatusChanger.changeStatus(originalInterviewStatus);
		}).toThrow(new InterviewCurrentlyEnabledException('La entrevista está actualmente habilitada.'));
	});

	
	
})
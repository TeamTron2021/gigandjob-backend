import { ChangeInterviewStatusToDisable } from "../../../../../domain/job-offer/domain-service/interview/ChangeInterviewStatusToDisable";
import InterviewCurrentlyDisabledException from "../../../../../domain/job-offer/exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException";
import { InterviewStatus } from "../../../../../domain/job-offer/shared/InterviewStatus.enum";
import { IChangeInterviewStatus } from "../../../../../shared/domain/IRejectInterview";

describe('ChangeInterviewStatusToDisable Unit Tests', () => {
	const expectedInterviewStatus: InterviewStatus = InterviewStatus.disabled;
	
	test('Should throw an interview currently disabled error', () => {
		const originalInterviewStatus: InterviewStatus = InterviewStatus.disabled;
		
		let interviewStatusChanger: IChangeInterviewStatus = new ChangeInterviewStatusToDisable();
		
		expect(() => {
			interviewStatusChanger.changeStatus(originalInterviewStatus);
		}).toThrow(new InterviewCurrentlyDisabledException('La entrevista está actualmente deshabilitada.'));
	});
	
	test('Should return "disable" interview status, from "created"', () => {
		const originalInterviewStatus: InterviewStatus = InterviewStatus.created;
		
		let interviewStatusChanger: IChangeInterviewStatus = new ChangeInterviewStatusToDisable();
		const newInterviewStatus: InterviewStatus = interviewStatusChanger.changeStatus(originalInterviewStatus);
		
		expect(newInterviewStatus).toBe(expectedInterviewStatus);
	})
})

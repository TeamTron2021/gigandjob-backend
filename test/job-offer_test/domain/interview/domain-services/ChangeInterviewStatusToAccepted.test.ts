import {InterviewStatus} from "../../../../../domain/interview/shared/InterviewStatus.enum";
import {IChangeInterviewStatus} from "../../../../../domain/interview/domain-services/IChangeInterviewStatus";
import ChangeInterviewStatusToAccepted
	from "../../../../../domain/interview/domain-services/ChangeInterviewStatusToAccepted";
import InterviewCurrentlyDisabledException
	from "../../../../../domain/interview/exceptions/ChangeInterviewStatus/InterviewCurrentlyDisabledException";

describe('Domain Service ChangeInterviewStatusToAccepted Unit Tests', () => {
	const expectedInterviewStatus: InterviewStatus = InterviewStatus.accepted;
	
	test('Should throw an interview currently disabled error', () => {
		const originalInterviewStatus: InterviewStatus = InterviewStatus.disabled;
		
		let interviewStatusChanger: IChangeInterviewStatus = new ChangeInterviewStatusToAccepted();
		
		expect(() => {
			interviewStatusChanger.changeStatus(originalInterviewStatus);
		}).toThrow(new InterviewCurrentlyDisabledException('La entrevista está actualmente deshabilitada.'));
	});
	
	test('Should return "accepted" interview status, from "created"', () => {
		const originalInterviewStatus: InterviewStatus = InterviewStatus.created;
		
		let interviewStatusChanger: IChangeInterviewStatus = new ChangeInterviewStatusToAccepted();
		const newInterviewStatus: InterviewStatus = interviewStatusChanger.changeStatus(originalInterviewStatus);
		
		expect(newInterviewStatus).toBe(expectedInterviewStatus);
	})
})

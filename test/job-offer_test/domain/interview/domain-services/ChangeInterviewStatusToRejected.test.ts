import { ChangeInterviewStatusToRejected } from "../../../../../domain/job-offer/domain-service/interview/ChangeInterviewStatusToRejected";
import InterviewCurrentlyDisabledException from "../../../../../domain/job-offer/exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException";
import { InterviewStatus } from "../../../../../domain/job-offer/shared/InterviewStatus.enum";
import { IChangeInterviewStatus } from "../../../../../shared/domain/IRejectInterview";



describe('test to changeInterviewStatusToRejected ',()=>{
    
    const expectedInterviewStatus : InterviewStatus = InterviewStatus.rejected;

    test('throw exception in a current status is disable',()=>{
    
        const interviewStatus: InterviewStatus = InterviewStatus.disabled;
        let interviewChanger : IChangeInterviewStatus = new ChangeInterviewStatusToRejected();

        expect(()=>{    
    
            interviewChanger.changeStatus(interviewStatus);
            }).toThrow(new InterviewCurrentlyDisabledException('Entrevista actualmente deshabilitada'));
    });

    test('Return "rejected" interview status',()=>{
    
        const interviewStatus: InterviewStatus = InterviewStatus.rejected;
        
        let interviewChanger : IChangeInterviewStatus = new ChangeInterviewStatusToRejected();
        const newInterviewStatus: InterviewStatus = interviewChanger.changeStatus(interviewStatus);

        expect(newInterviewStatus).toBe(expectedInterviewStatus);
    });

});
import InterviewCurrentlyDisabledException from "../../exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException";
import { InterviewStatus } from "../../shared/InterviewStatus.enum";
import { IChangeInterviewStatus } from "./IChangeInterviewStatus";


export class ChangeInterviewStatusToRejected extends  IChangeInterviewStatus{
  
    public changeStatus(interviewStatus: InterviewStatus): InterviewStatus {
        
        if(interviewStatus == InterviewStatus.disabled){
            throw new InterviewCurrentlyDisabledException('Entrevista actualmente deshabilitada');
        }
        return InterviewStatus.rejected;
    }
}

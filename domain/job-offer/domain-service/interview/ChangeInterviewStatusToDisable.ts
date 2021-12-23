import InterviewCurrentlyDisabledException from "../../exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException";
import { InterviewStatus } from "../../shared/InterviewStatus.enum";
import { IChangeInterviewStatus } from "./IChangeInterviewStatus";


export class ChangeInterviewStatusToDisable extends  IChangeInterviewStatus{
  
    public changeStatus(interviewStatus: InterviewStatus): InterviewStatus {
        
        if (interviewStatus == InterviewStatus.disabled) {
            throw new InterviewCurrentlyDisabledException('La entrevista está actualmente deshabilitada.');
        }
       
        return InterviewStatus.disabled;
    }
}

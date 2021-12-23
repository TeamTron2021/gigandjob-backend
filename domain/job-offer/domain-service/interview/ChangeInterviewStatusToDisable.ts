import InterviewCurrentlyDisabledException from "../../exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException";
import { InterviewStatus } from "../../shared/InterviewStatus.enum";
import { IChangeInterviewStatus } from "./IChangeInterviewStatus";


export class ChangeInterviewStatusToDisable extends  IChangeInterviewStatus{
  
    public changeStatus(interviewStatus: InterviewStatus): InterviewStatus {
        
       
        return InterviewStatus.disabled;
    }
}

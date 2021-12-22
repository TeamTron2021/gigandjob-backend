
import {IChangeInterviewStatus} from "./IChangeInterviewStatus";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import InterviewCurrentlyDisabledException from "../exceptions/ChangeInterviewStatus/InterviewCurrentlyDisabledException";

export class ChangeInterviewStatusToRejected extends  IChangeInterviewStatus{
  
    public changeStatus(interviewStatus: InterviewStatus): InterviewStatus {
        
        if(interviewStatus == InterviewStatus.disabled){
            throw new InterviewCurrentlyDisabledException('Entrevista actualmente deshabilitada');
        }
        return InterviewStatus.rejected;
    }
}


import {IChangeInterviewStatus} from "./IChangeInterviewStatus";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import InterviewCurrentlyDisabledException from "../exceptions/ChangeInterviewStatus/InterviewCurrentlyDisabledException";

export class InterviewRejected extends  IChangeInterviewStatus{
  
    public changeStatus(interviewStatus: InterviewStatus): InterviewStatus {
        if(interviewStatus == InterviewStatus.disabled){
            throw new InterviewCurrentlyDisabledException('Entrevista esta deshabilitada');
        }
        return InterviewStatus.rejected;
    }
}

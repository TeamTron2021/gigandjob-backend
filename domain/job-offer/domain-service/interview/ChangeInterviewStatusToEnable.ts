import InterviewCurrentlyEnabledException from "../../exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyEnabledException";
import { InterviewStatus } from "../../shared/InterviewStatus.enum";
import { IChangeInterviewStatus } from "./IChangeInterviewStatus";

export class ChangeInterviewStatusToEnable extends  IChangeInterviewStatus{
  
    public changeStatus(interviewStatus: InterviewStatus): InterviewStatus {
        
        if (interviewStatus == InterviewStatus.enable) {
            throw new InterviewCurrentlyEnabledException('La entrevista está actualmente habilitada.');
        }
       
        return InterviewStatus.enable;
    }
}
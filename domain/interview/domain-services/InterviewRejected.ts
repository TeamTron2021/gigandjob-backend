
import {IChangeInterviewStatus} from "./IChangeInterviewStatus";
import { InterviewStatus } from "../shared/InterviewStatus.enum";

export class InterviewRejected implements  IChangeInterviewStatus{
  
    public changeStatus(interviewStatus: InterviewStatus): InterviewStatus {
        return InterviewStatus.rejected;
    }
}

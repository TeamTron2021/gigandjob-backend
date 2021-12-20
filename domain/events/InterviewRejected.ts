
import { IChangeInterviewStatus } from "../../shared/domain/IInterviewReject";

export class InterviewRejected implements  IChangeInterviewStatus{
   private interview: Interview; 
    
   constructor(interview: Interview){ 
        this.interview = interview;
    }

    changeStatus(interview : Interview): Interview { 
   
        if(interview.Id === this.interview.Id){
            return interview.status = 'rejected';
        }
         
    }
    
}

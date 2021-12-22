import Interview from "../entities/Interview";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import InterviewInterviewed from "../value-objects/interview/InterviewInterviewed";
import InterviewInterviewer from "../value-objects/interview/InterviewInterviewer";
import { InterviewDate } from "../value-objects/interviewDate";
import { InterviewDescription } from "../value-objects/interviewDescription";
import { InterviewId } from "../value-objects/interviewId";
import { InterviewTitle } from "../value-objects/interviewTitle";


export default class disableInterview{

    public disableInterview(
        ar: Array<Interview<InterviewStatus.enable>>
        ): Array<any>{



        for (var i = 0; i < ar.length; i++) {


            if (ar[i].status == 5){

                ar[i].status = 3;
    
            }
        }

        return ar;

    }
}
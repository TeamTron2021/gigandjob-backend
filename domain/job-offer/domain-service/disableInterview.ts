import Interview from "../entities/Interview";
import InterviewCurrentlyDisabledException from "../exceptions/Interview/ChangeInterviewStatus/InterviewCurrentlyDisabledException";
import { InterviewStatus } from "../shared/InterviewStatus.enum";



export default class disableInterview{

    public disableInterview(
        ar: Array<Interview<InterviewStatus.enable>>
        ): Array<any>{



        for (var i = 0; i < ar.length; i++) {


            if (ar[i].status == InterviewStatus.enable){

                ar[i].status = 3;
                throw new InterviewCurrentlyDisabledException('La entrevista está deshabilitada.');
    
            }
        }

        return ar;

    }
}
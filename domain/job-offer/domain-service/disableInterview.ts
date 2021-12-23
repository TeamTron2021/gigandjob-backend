import Interview from "../entities/Interview";
import { InterviewStatus } from "../shared/InterviewStatus.enum";



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
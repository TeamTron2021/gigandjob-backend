import {IChangeInterviewStatus} from "./IChangeInterviewStatus";
import Interview from "../entities/Interview";

export class ChangeInterviewStatusToAccepted extends IChangeInterviewStatus{
    public changeStatus(interview: Interview<any>): void {
    
    }
}
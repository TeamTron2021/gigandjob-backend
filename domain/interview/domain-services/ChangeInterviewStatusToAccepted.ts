import {IChangeInterviewStatus} from "./IChangeInterviewStatus";
import {InterviewStatus} from "../shared/InterviewStatus.enum";

export class ChangeInterviewStatusToAccepted extends IChangeInterviewStatus{
    public changeStatus(interviewStatus: InterviewStatus): InterviewStatus {
        return InterviewStatus.accepted;
    }
}
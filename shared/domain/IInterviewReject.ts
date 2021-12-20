
import { InterviewRejected } from "../../domain/events/InterviewRejected";

export interface IChangeInterviewStatus{

    changeStatus(interview: Interview): Interview;
}
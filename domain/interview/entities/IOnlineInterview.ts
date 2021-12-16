
import { InterviewId } from "../value-objects/interviewId";
import { InterviewTitle } from "../value-objects/interviewTitle";
import { InterviewDescription } from "../value-objects/interviewDescription";
import { InterviewDate } from "../value-objects/interviewDate";
import { InterviewParticipant } from "../value-objects/interviewParticipant";
import { IInterview } from "./iinterview";


export interface IOnlineInterview extends IInterview{
    id: InterviewId;
    title: InterviewTitle;
    description: InterviewDescription;
    date: InterviewDate;
    interviewed: InterviewParticipant;
    interviewer: InterviewParticipant;
}
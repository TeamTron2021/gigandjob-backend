
import { InterviewId } from "../value-objects/interviewId";
import { InterviewTitle } from "../value-objects/interviewTitle";
import { InterviewDescription } from "../value-objects/interviewDescription";
import { InterviewDate } from "../value-objects/interviewDate";
import { InterviewParticipant } from "../value-objects/interviewParticipant";

export interface IInterview{
    id: InterviewId;
    title: InterviewTitle;
    description: InterviewDescription;
    date: InterviewDate;
    interviewed: InterviewParticipant;
    interviewer: InterviewParticipant;
}

import { InPersonInterviewDirection } from "../value-objects/InPersonInterviewDirection";
import { IInterview } from "./iinterview";


export interface IInPersonInterview extends IInterview{
    urlMeeting: InPersonInterviewDirection;
}
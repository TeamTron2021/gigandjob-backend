
import { InPersonInterviewDirection } from "../value-objects/InPersonInterviewDirection";
import { IInterview } from "./IInterview";


export interface IInPersonInterview extends IInterview{
    urlMeeting: InPersonInterviewDirection;
}
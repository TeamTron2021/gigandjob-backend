
import { OnlineInterviewUrlMeeting } from "../value-objects/OnlineInterviewUrlMeeting";
import { IInterview } from "./IInterview";


export interface IOnlineInterview extends IInterview{
    urlMeeting: OnlineInterviewUrlMeeting;
}
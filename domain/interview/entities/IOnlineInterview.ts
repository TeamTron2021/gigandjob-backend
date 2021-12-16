
import { OnlineInterviewUrlMeeting } from "../value-objects/OnlineInterviewUrlMeeting";
import { IInterview } from "./iinterview";


export interface IOnlineInterview extends IInterview{
    urlMeeting: OnlineInterviewUrlMeeting;
}
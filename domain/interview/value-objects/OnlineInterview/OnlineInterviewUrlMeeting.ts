import { IValueObject } from "../../../../shared/domain/IValueObject";
import InterviewEmptyUrlMeetingException from "../../exceptions/OnlineInterview/InterviewEmptyUrlMeetingException";

export default class OnlineInterviewUrlMeeting implements IValueObject {
    constructor(private readonly onlineInterviewUrlMeeting: string) {}

    public equals(valueObject: OnlineInterviewUrlMeeting): boolean {
        return this.onlineInterviewUrlMeeting == valueObject.onlineInterviewUrlMeeting;
    }

    public static create(onlineInterviewUrlMeeting: string) {
        if(onlineInterviewUrlMeeting === '' || onlineInterviewUrlMeeting === ' ' || onlineInterviewUrlMeeting == null || OnlineInterviewUrlMeeting == undefined) {
            throw new InterviewEmptyUrlMeetingException(
                'El titulo de la oferta no puede estar vacio'
            )
        }
        return new OnlineInterviewUrlMeeting(onlineInterviewUrlMeeting);
    }

    public getUrlMeeting(){
        return this.onlineInterviewUrlMeeting;
    }

}
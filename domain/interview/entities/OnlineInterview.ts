import IDomainEvent from "../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import IInterview from "../shared/IInterview";
import OnlineInterviewCreated from "../domain-events/online-interview/OnlineInterviewCreated.Event";
import InterviewTitle from "../value-objects/interview/InterviewTitle";
import InterviewDescription from "../value-objects/interview/InterviewDescription";
import InterviewDate from "../value-objects/interview/InterviewDate";
import InterviewId from "../value-objects/interview/InterviewId";
import InterviewParticipant from "../value-objects/interview/InterviewParticipant";
import OnlineInterviewUrlMeeting from "../value-objects/OnlineInterview/OnlineInterviewUrlMeeting";

export default class OnlineInterview <S extends InterviewStatus> implements IInterview{
    private eventRecorder: IDomainEvent[] = [];
    public status: S;
    constructor( 
        
        public title: InterviewTitle,
        public description: InterviewDescription,
        public date: InterviewDate,
        public interviewed: InterviewParticipant,
        public interviewer: InterviewParticipant,
        status: S,
        public Id: InterviewId,
        public urlMeeting: OnlineInterviewUrlMeeting,)
        {
            this.status = status;
    } 

    public addEvent(domainEvent: IDomainEvent){
        this.eventRecorder.push(domainEvent);
    }

    
    static create( 
        title: InterviewTitle,
        description: InterviewDescription,
        date: InterviewDate,
        interviewed: InterviewParticipant,
        interviewer: InterviewParticipant,
        Id: InterviewId,
        urlMeeting: OnlineInterviewUrlMeeting,
    ){
        const onlineInterview = new OnlineInterview(title,description,date,interviewed,interviewer,InterviewStatus.created,Id,urlMeeting);
        onlineInterview.addEvent(new OnlineInterviewCreated(Id,title,description,date,interviewed,interviewer,InterviewStatus.created,urlMeeting));
        return onlineInterview;
    }

}
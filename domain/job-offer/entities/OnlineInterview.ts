import IDomainEvent from "../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import IInterview from "../shared/IInterview";
import OnlineInterviewCreated from "../domain-events/interview/online-interview/OnlineInterviewCreated.Event";
import InterviewTitle from "../value-objects/Interview/interview/InterviewTitle";
import InterviewDescription from "../value-objects/Interview/interview/InterviewDescription";
import InterviewDate from "../value-objects/Interview/interview/InterviewDate";
import InterviewId from "../value-objects/Interview/interview/InterviewId";
import OnlineInterviewUrlMeeting from "../value-objects/Interview/OnlineInterview/OnlineInterviewUrlMeeting";
import InterviewInterviewer from "../value-objects/Interview/interview/InterviewInterviewer";
import InterviewInterviewed from "../value-objects/Interview/interview/InterviewInterviewed";

export default class OnlineInterview <S extends InterviewStatus> implements IInterview{
    private eventRecorder: IDomainEvent[] = [];
    public status: S;
    constructor( 
        
        public title: InterviewTitle,
        public description: InterviewDescription,
        public date: InterviewDate,
        public interviewed: InterviewInterviewed,
        public interviewer: InterviewInterviewer,
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
        interviewed: InterviewInterviewed,
        interviewer: InterviewInterviewer,
        Id: InterviewId,
        urlMeeting: OnlineInterviewUrlMeeting,
    ){
        const onlineInterview = new OnlineInterview(title,description,date,interviewed,interviewer,InterviewStatus.created,Id,urlMeeting);
        onlineInterview.addEvent(new OnlineInterviewCreated(Id,title,description,date,interviewed,interviewer,InterviewStatus.created,urlMeeting));
        return onlineInterview;
    }

}
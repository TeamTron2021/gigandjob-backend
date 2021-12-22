import IDomainEvent from "../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import IInterview from "../shared/IInterview";
import InPersonInterviewCreated from "../domain-events/interview/in-person-interview/InPersonInterviewCreated.Event";
import InterviewTitle from "../value-objects/Interview/interview/InterviewTitle";
import InterviewDescription from "../value-objects/Interview/interview/InterviewDescription";
import InterviewDate from "../value-objects/Interview/interview/InterviewDate";
import InterviewId from "../value-objects/Interview/interview/InterviewId";
import InPersonInterviewDirection from "../value-objects/Interview/InPersonInterview/InPersonInterviewDirection";
import InterviewInterviewed from "../value-objects/Interview/interview/InterviewInterviewed";
import InterviewInterviewer from "../value-objects/Interview/interview/InterviewInterviewer";

export default class InPersonInterview <S extends InterviewStatus> implements IInterview{
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
        public direction: InPersonInterviewDirection,)
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
        direction: InPersonInterviewDirection,
    ){
        const inPersonInterview = new InPersonInterview(title,description,date,interviewed,interviewer,InterviewStatus.created,Id,direction);
        inPersonInterview.addEvent(new InPersonInterviewCreated(Id,title,description,date,interviewed,interviewer,InterviewStatus.created,direction));
        return inPersonInterview;
    }

}
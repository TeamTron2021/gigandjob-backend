import IDomainEvent from "../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import IInterview from "../shared/IInterview";
import InPersonInterviewCreated from "../domain-events/in-person-interview/InPersonInterviewCreated.Event";
import InterviewTitle from "../value-objects/interview/InterviewTitle";
import InterviewDescription from "../value-objects/interview/InterviewDescription";
import InterviewDate from "../value-objects/interview/InterviewDate";
import InterviewId from "../value-objects/interview/InterviewId";
import InterviewParticipant from "../value-objects/interview/InterviewParticipant";
import InPersonInterviewDirection from "../value-objects/InPersonInterview/InPersonInterviewDirection";

export default class InPersonInterview <S extends InterviewStatus> implements IInterview{
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
        interviewed: InterviewParticipant,
        interviewer: InterviewParticipant,
        Id: InterviewId,
        direction: InPersonInterviewDirection,
    ){
        const inPersonInterview = new InPersonInterview(title,description,date,interviewed,interviewer,InterviewStatus.created,Id,direction);
        inPersonInterview.addEvent(new InPersonInterviewCreated(Id,title,description,date,interviewed,interviewer,InterviewStatus.created,direction));
        return inPersonInterview;
    }

}
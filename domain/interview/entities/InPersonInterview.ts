import IDomainEvent from "../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import { InterviewId } from "../value-objects/interviewId";
import { InterviewTitle } from "../value-objects/interviewTitle";
import { InterviewDescription } from "../value-objects/interviewDescription";
import { InterviewDate } from "../value-objects/interviewDate";
import { InterviewParticipant } from "../value-objects/interviewParticipant";
import { InPersonInterviewDirection } from "../value-objects/InPersonInterviewDirection";
import IInterview from "../shared/IInterview";
import InPersonInterviewCreated from "../domain-events/in-person-interview/InPersonInterviewCreated.Event";

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
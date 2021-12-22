import IDomainEvent from "../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import InterviewCreated from "../domain-events/interview/InterviewCreated.Event";
import IInterview from "../shared/IInterview";
import InterviewTitle from "../value-objects/interview/InterviewTitle";
import InterviewDescription from "../value-objects/interview/InterviewDescription";
import InterviewDate from "../value-objects/interview/InterviewDate";
import InterviewId from "../value-objects/interview/InterviewId";
import InterviewInterviewer from "../value-objects/interview/InterviewInterviewer";
import InterviewInterviewed from "../value-objects/interview/InterviewInterviewed";
import InterviewDataUpdated from "../domain-events/interview/InterviewDataUpdated.Event"

export default class Interview<S extends InterviewStatus> implements IInterview {
    private eventRecorder: IDomainEvent[] = [];
    public status: S;
    constructor ( 
        
        public title: InterviewTitle,
        public description: InterviewDescription,
        public date: InterviewDate,
        public interviewed: InterviewInterviewed,
        public interviewer: InterviewInterviewer,
        status: S,
        public Id: InterviewId,
        ){   
        this.status =  status;
        
    }

    public getInterviewId(){
        return this.Id;
    }
    public getInterviewInterviewed(){
        return this.interviewed;
    }
    public getInterviewInterviewer(){
        return this.interviewer;
    }

    
    public getEvents(){
        return this.eventRecorder;
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
    ){
        const interview = new Interview(title,description,date,interviewed,interviewer,InterviewStatus.created,Id, );
        interview.eventRecorder.push(new InterviewCreated(Id,title,description,date,interviewed,interviewer,InterviewStatus.created));
        return interview;
    }

    updateData(
		Description: InterviewDescription,
		Title: InterviewTitle,
	){
		this.description = Description
		this.title = Title
		this.eventRecorder.push(new InterviewDataUpdated(
			this.title,
			this.description,
		))
	}

}
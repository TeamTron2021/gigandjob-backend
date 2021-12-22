import IDomainEvent from "../../../shared/domain/IDomainEvent";
import { InterviewStatus } from "../shared/InterviewStatus.enum";
import InterviewCreated from "../domain-events/interview/interview/interviewCreated/InterviewCreated.Event";
import IInterview from "../shared/IInterview";
import InterviewTitle from "../value-objects/Interview/interview/InterviewTitle";
import InterviewDescription from "../value-objects/Interview/interview/InterviewDescription";
import InterviewDate from "../value-objects/Interview/interview/InterviewDate";
import InterviewId from "../value-objects/Interview/interview/InterviewId";
import InterviewInterviewer from "../value-objects/Interview/interview/InterviewInterviewer";
import InterviewInterviewed from "../value-objects/Interview/interview/InterviewInterviewed";
import NotificationSubject from "../value-objects/Interview/interview/interview-notification/NotificationSubject";
import NotificationContent from "../value-objects/Interview/interview/interview-notification/NotificationContent";
import InterviewNotification from "./InterviewNotification";
import InterviewRegistered from "../domain-events/interview/interview/notifications/InterviewRegistered.Event";
import InterviewRechedule from "../domain-events/interview/interview/interviewReschedule/InterviewRechedule.Event";
import { InterviewDataUpdated } from "../domain-events/interview/InterviewDataUpdated.Event";
import ChangeInterviewStatusToRescheduled from "../domain-service/interview/ChangeInterviewStatusToRescheduled";
import { IChangeInterviewStatus } from "../domain-service/interview/IChangeInterviewStatus";


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

        const interview = new Interview(
            title,
            description,
            date,
            interviewed,
            interviewer,
            InterviewStatus.created,
            Id,
        ); 

        interview.eventRecorder.push(new InterviewCreated(
            title,
            description,
            date,
            interviewed,
            interviewer,
            InterviewStatus.created,
            Id
        ))

        const subject = new NotificationSubject('Ha agendado correctamente la Entrevista');
        const content = new NotificationContent('Ahora tienes que seguir los siguientes pasos');
        const interviewNotification = InterviewNotification.register(
            subject,
            content,
            interview
        )
        
        interview.eventRecorder.push(new InterviewRegistered(subject, content));
        return interview;

    }

    public rescheduledInterview(
        this: Interview<S>
    ):Interview<InterviewStatus.rescheduled>{
        const interview = new Interview(
            this.title,
            this.description,
            this.date,
            this.interviewed,
            this.interviewer,
            InterviewStatus.rescheduled,
            this.Id
        );
        interview.eventRecorder = this.eventRecorder.slice(0);

        const interviewStatusChanger: IChangeInterviewStatus = new ChangeInterviewStatusToRescheduled();
        const newInterviewStatus: InterviewStatus = interviewStatusChanger.changeStatus(this.status);

        interview.eventRecorder.push(new InterviewRechedule(this.Id, this.date,InterviewStatus.rescheduled)); 
        const subject = new NotificationSubject('La Entrevista ha sido reprogramada');
        const content = new NotificationContent('Ahora tienes que seguir los siguientes pasos');
        const interviewNotification = new InterviewNotification(subject,content,interview); 
        interviewNotification.sendRescheduled();
        return  interview;

    }

    updateData(
		Description: InterviewDescription,
		Title: InterviewTitle,
	){
		this.description = Description
		this.title = Title
		this.eventRecorder.push(new InterviewDataUpdated(
			this.description,
            this.title
		))
	}

}
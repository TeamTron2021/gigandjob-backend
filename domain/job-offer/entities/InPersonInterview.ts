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
import { IChangeInterviewStatus } from "../domain-service/interview/IChangeInterviewStatus";
import ChangeInterviewStatusToRescheduled from "../domain-service/interview/ChangeInterviewStatusToRescheduled";
import InPersonInterviewRechedule from "../domain-events/interview/in-person-interview/inPersonInterviewReschedule/InPersonInterviewRechedule.Event";
import NotificationSubject from "../value-objects/Interview/interview/interview-notification/NotificationSubject";
import NotificationContent from "../value-objects/Interview/interview/interview-notification/NotificationContent";
import InterviewNotification from "./InterviewNotification";
import { InterviewDataUpdated } from "../domain-events/interview/InterviewDataUpdated.Event";
import ChangeInterviewStatusToAccepted from "../domain-service/interview/ChangeInterviewStatusToAccepted";
import { ChangeInterviewStatusToRejected } from "../domain-service/interview/ChangeInterviewStatusToRejected";

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

    public getInterviewId(){
        return this.Id;
    }
    
    public getStatus() {
        return this.status;
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

    public rescheduledInterview(
        this: InPersonInterview<S>
    ):InPersonInterview<InterviewStatus.rescheduled>{
        const interview = new InPersonInterview(
            this.title,
            this.description,
            this.date,
            this.interviewed,
            this.interviewer,
            InterviewStatus.rescheduled,
            this.Id,
            this.direction,
        );
        interview.eventRecorder = this.eventRecorder.slice(0);

        const interviewStatusChanger: IChangeInterviewStatus = new ChangeInterviewStatusToRescheduled();
        const newInterviewStatus: InterviewStatus = interviewStatusChanger.changeStatus(this.status);

        interview.eventRecorder.push(new InPersonInterviewRechedule(this.Id, this.date,InterviewStatus.rescheduled,this.direction));
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
    
    /**
     * Cambia el estado de la entrevista a "accepted", siempre y cuando no esté actualmente en "disabled".
     *
     * @throws InterviewCurrentlyDisabledException
     * */
    public acceptInterview(): void {
        try {
            const interviewStatusChanger: IChangeInterviewStatus = new ChangeInterviewStatusToAccepted();
            this.status = interviewStatusChanger.changeStatus(this.status);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public rejectInterview():void{
        try{
            let interviewStatus : IChangeInterviewStatus = new ChangeInterviewStatusToRejected();
            this.status = interviewStatus.changeStatus(this.status);
        }catch(e){
            console.log(e);
            throw e;
        }
           
        }
}
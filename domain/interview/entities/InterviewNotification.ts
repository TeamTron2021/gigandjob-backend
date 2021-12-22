import  IDomainEvent  from "../../../shared/domain/events/IDomainEvent";
import  {InterviewNotificationSubject} from "../value-objects/InterviewNotificationSubject";
import  {InterviewNotificationContent} from "../value-objects/InterviewNotificationContent";

export default class InterviewNotification{

    private eventRecorder: IDomainEvent[] = [];

    constructor(
        private readonly subject: InterviewNotificationSubject,
        private readonly content: InterviewNotificationContent
        
        //private readonly receiver: InterviewParticipant
    ){}

    public sendNotification() : void{
        this.eventRecorder.push( this.content,this.subject);
    }
}
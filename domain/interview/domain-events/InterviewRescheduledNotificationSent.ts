import InterviewParticipant from "../value-objects/interview/InterviewParticipant";
import { InterviewNotificationContent } from "../value-objects/InterviewNotificationContent";
import { InterviewNotificationSubject } from "../value-objects/InterviewNotificationSubject";

export class InterviewRescheduledNotificationSent{
    
    constructor(private subject: InterviewNotificationSubject,
                private content: InterviewNotificationContent,
                private receiver: InterviewParticipant
        ){}

}
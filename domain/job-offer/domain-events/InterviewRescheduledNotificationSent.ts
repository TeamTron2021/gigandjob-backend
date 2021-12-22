import InterviewParticipant from "../../job-offer/value-objects/Interview/interview/InterviewParticipant";
import { InterviewNotificationContent } from "../../job-offer/value-objects/Interview/InterviewNotificationContent";
import { InterviewNotificationSubject } from "../../job-offer/value-objects/Interview/InterviewNotificationSubject";

export class InterviewRescheduledNotificationSent{
    
    constructor(private subject: InterviewNotificationSubject,
                private content: InterviewNotificationContent,
                private receiver: InterviewParticipant
        ){}

}
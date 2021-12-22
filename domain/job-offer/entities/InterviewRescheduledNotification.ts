import InterviewNotification from "./InterviewNotification";
import {InterviewRescheduledNotificationSent} from "../domain-events/InterviewRescheduledNotificationSent";

export default class InterviewReschuledNotification extends InterviewNotification{
  
    public sendNotification(): void {
        
             this.sendRescheduled();   
    }
}
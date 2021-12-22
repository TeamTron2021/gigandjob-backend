import CVID from "../../value_objects/CV/CVID.value";
import NotificationContent from "../../value_objects/CV/NotificationContent.value";
import NotificationSubject from "../../value_objects/CV/NotificationSubject.value";

export default class CVLoadedNotification {
    constructor(
        public id: CVID,
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent, 
    ) {

    }

}
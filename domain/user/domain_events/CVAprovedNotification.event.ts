import CVID from "../value_objects/CVID.value";
import NotificationContent from "../value_objects/NotificationContent.value";
import NotificationSubject from "../value_objects/NotificationSubject.value";

export default class CVAprovedNotification {
    constructor(
        public id: CVID,
        private readonly subject: NotificationSubject,
        private readonly content: NotificationContent, 
    ) {

    }

}

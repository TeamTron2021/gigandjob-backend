import {InterviewNotificationSubject} from "../value-objects/Interview/InterviewNotificationSubject";
import {InterviewNotificationContent} from "../value-objects/Interview/InterviewNotificationContent";
import Interview from "./Interview";
import {InterviewStatus} from "../shared/InterviewStatus.enum";
import InterviewNotificationId from "../value-objects/Interview/interview/InterviewNotificationId";

export default class InterviewAcceptedNotification /*extends InterviewNotification*/ {
	public constructor(
		private readonly subject: InterviewNotificationSubject,
		private readonly content: InterviewNotificationContent,
		private readonly interview: Interview<InterviewStatus>,
		private readonly id: InterviewNotificationId
	) {}
};
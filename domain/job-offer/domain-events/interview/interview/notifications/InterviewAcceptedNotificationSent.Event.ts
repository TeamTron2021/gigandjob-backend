import IDomainEvent from "../../../../../../shared/domain/IDomainEvent";
import InterviewId from "../../../../value-objects/Interview/interview/InterviewId";
import {InterviewNotificationSubject} from "../../../../value-objects/Interview/InterviewNotificationSubject";
import {InterviewNotificationContent} from "../../../../value-objects/Interview/InterviewNotificationContent";

export default class InterviewAcceptedNotificationSent implements IDomainEvent {
	public constructor(
		private readonly idInterview: InterviewId,
		private readonly subject: InterviewNotificationSubject,
		private readonly content: InterviewNotificationContent
	) {}
};
import {InterviewNotificationSubject} from "../value-objects/Interview/InterviewNotificationSubject";
import {InterviewNotificationContent} from "../value-objects/Interview/InterviewNotificationContent";
import InterviewNotificationId from "../value-objects/Interview/interview/InterviewNotificationId";
import UniqueId from "../../../shared/domain/UniqueUUID";
import InterviewId from "../value-objects/Interview/interview/InterviewId";

export default class InterviewAcceptedNotification /*extends InterviewNotification*/ {
	private constructor(
		private readonly subject: InterviewNotificationSubject,
		private readonly content: InterviewNotificationContent,
		private readonly interview: InterviewId,
		private readonly id: InterviewNotificationId
	) {}
	
	public static create(
		subject: InterviewNotificationSubject,
		content: InterviewNotificationContent,
		interview: InterviewId
	): InterviewAcceptedNotification {
		const id = InterviewNotificationId.create(new UniqueId().getId());
		
		try {
			return new InterviewAcceptedNotification(subject, content, interview, id);
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
	
	public getId(): InterviewNotificationId {
		return this.id;
	}
};
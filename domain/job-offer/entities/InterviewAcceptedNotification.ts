import {InterviewNotificationSubject} from "../value-objects/Interview/InterviewNotificationSubject";
import {InterviewNotificationContent} from "../value-objects/Interview/InterviewNotificationContent";
import InterviewNotificationId from "../value-objects/Interview/interview/InterviewNotificationId";
import UniqueId from "../../../shared/domain/UniqueUUID";
import InterviewId from "../value-objects/Interview/interview/InterviewId";
import IDomainEvent from "../../../shared/domain/IDomainEvent";
import InterviewAcceptedNotificationSent
	from "../domain-events/interview/interview/notifications/InterviewAcceptedNotificationSent.Event";

export default class InterviewAcceptedNotification /*extends InterviewNotification*/ {
	private eventRecorder: IDomainEvent[] = [];
	
	private constructor(
		private readonly subject: InterviewNotificationSubject,
		private readonly content: InterviewNotificationContent,
		private readonly interview: InterviewId,
		private readonly id: InterviewNotificationId
	) {}
	
	/**
	 * Crea una notificación de entrevista aceptada. Genera internamente el ID de dicha notificación.
	 *
	 * @param subject Asunto de la notificación.
	 * @param content contenido de la notificación.
	 * @param interview ID de la entrevista aceptada.
	 * */
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
	
	public getEventRecorder(): IDomainEvent[] {
		return this.eventRecorder;
	}
	
	public sendNotification(): void {
		const event: IDomainEvent = new InterviewAcceptedNotificationSent(
			this.interview,
			this.subject,
			this.content,
			this.id
		);
		this.eventRecorder.push(event);
	}
};
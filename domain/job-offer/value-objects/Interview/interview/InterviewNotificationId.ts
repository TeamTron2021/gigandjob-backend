import {IValueObject} from "../../../../../shared/domain/IValueObject";
import InterviewNotificationIdException
	from "../../../exceptions/Interview/Interview/interview-notification/InterviewNotificationIdException";

export default class InterviewNotificationId implements IValueObject {
	private constructor(readonly id: string) {}
	
	equals(valueObject: InterviewNotificationId): boolean {
		return this.id === valueObject.getId();
	}
	
	public getId() {
		return this.id;
	}
	
	public static create(id: string): InterviewNotificationId {
		if (id === '' || id === ' ' || id == undefined || id == null) {
			throw new InterviewNotificationIdException('El ID de la notificación no puede ser vacío');
		}
		
		return new InterviewNotificationId(id)
	}
};
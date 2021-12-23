import InterviewNotificationId
	from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewNotificationId";
import InterviewNotificationIdException
	from "../../../../../domain/job-offer/exceptions/Interview/Interview/interview-notification/InterviewNotificationIdException";
import UniqueId from "../../../../../shared/domain/UniqueUUID";

describe('Value Object InterviewNotificationId Tests', () => {
	test('Should return an interview notification id exception because of an empty value as parameter', () => {
		const id: any = "";
		
		expect(() => {
			InterviewNotificationId.create(id)
		})
			.toThrowError(new InterviewNotificationIdException('El ID de la notificación no puede ser vacío'));
	})
	test('Should return an interview notification id exception because of an space value as parameter', () => {
		const id: any = " ";
		
		expect(() => {
			InterviewNotificationId.create(id)
		})
			.toThrowError(new InterviewNotificationIdException('El ID de la notificación no puede ser vacío'));
	})
	test('Should return an interview notification id exception because of an undefined value as parameter', () => {
		const id: any = undefined;
		
		expect(() => {
			InterviewNotificationId.create(id)
		})
			.toThrowError(new InterviewNotificationIdException('El ID de la notificación no puede ser vacío'));
	})
	test('Should return an interview notification id exception because of an null value as parameter', () => {
		const id: any = null;
		
		expect(() => {
			InterviewNotificationId.create(id)
		})
			.toThrowError(new InterviewNotificationIdException('El ID de la notificación no puede ser vacío'));
	})
	test('Should create an InterviewNotificationId, successfully', () => {
		const id = new UniqueId().getId();
		const interviewNotificationId = InterviewNotificationId.create(id);
		
		expect(interviewNotificationId).toBeInstanceOf(InterviewNotificationId);
	})
})
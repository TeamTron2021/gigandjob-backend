import {
	InterviewNotificationSubject
} from "../../../../../domain/job-offer/value-objects/Interview/InterviewNotificationSubject";
import {
	InterviewNotificationContent
} from "../../../../../domain/job-offer/value-objects/Interview/InterviewNotificationContent";
import InterviewId from "../../../../../domain/job-offer/value-objects/Interview/interview/InterviewId";
import UniqueId from "../../../../../shared/domain/UniqueUUID";
import InterviewAcceptedNotification from "../../../../../domain/job-offer/entities/InterviewAcceptedNotification";

// Creación de VO para la notificación de entrevista aceptada.
const interviewAcceptedNotificationSubject: InterviewNotificationSubject
	= new InterviewNotificationSubject("Asunto");
const interviewAcceptedNotificationContent: InterviewNotificationContent
	= new InterviewNotificationContent("Contenido");
const interview: InterviewId = InterviewId.create(new UniqueId().getId());

describe('Entity InterviewAcceptedNotification Tests', () => {
	test('Should create an InterviewAcceptedNotification instance', () => {
		const interviewAcceptedNotification = InterviewAcceptedNotification.create(
			interviewAcceptedNotificationSubject,
			interviewAcceptedNotificationContent,
			interview
		);
		
		expect(interviewAcceptedNotification).toBeInstanceOf(InterviewAcceptedNotification);
	});
})
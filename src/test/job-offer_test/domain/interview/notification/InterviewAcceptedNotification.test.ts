import { InterviewNotificationSubject } from '../../../../../domain/job-offer/value-objects/Interview/InterviewNotificationSubject';
import { InterviewNotificationContent } from '../../../../../domain/job-offer/value-objects/Interview/InterviewNotificationContent';
import InterviewId from '../../../../../domain/job-offer/value-objects/Interview/interview/InterviewId';
import UniqueId from '../../../../../shared/domain/UniqueUUID';
import InterviewAcceptedNotification from '../../../../../domain/job-offer/entities/InterviewAcceptedNotification';

// Creación de VO para la notificación de entrevista aceptada.
const interviewAcceptedNotificationSubject: InterviewNotificationSubject =
  new InterviewNotificationSubject('Asunto');
const interviewAcceptedNotificationContent: InterviewNotificationContent =
  new InterviewNotificationContent('Contenido');
const interview: InterviewId = InterviewId.create(new UniqueId().getId());
const interviewAcceptedNotification = InterviewAcceptedNotification.create(
  interviewAcceptedNotificationSubject,
  interviewAcceptedNotificationContent,
  interview,
);

describe('Entity InterviewAcceptedNotification Tests', () => {
  test('Should create an InterviewAcceptedNotification instance', () => {
    expect(interviewAcceptedNotification).toBeInstanceOf(
      InterviewAcceptedNotification,
    );
  });

  test('Should create a domain event and push it into the event recorder', () => {
    interviewAcceptedNotification.sendNotification();
    const event = interviewAcceptedNotification.getEventRecorder();
    expect(event).toBeTruthy();
  });
});

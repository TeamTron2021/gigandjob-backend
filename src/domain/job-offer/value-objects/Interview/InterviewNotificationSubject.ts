import { IValueObject } from '../../../../shared/domain/IValueObject';
import NotificationEmptySubjectException from '../../exceptions/JobOffer/JobOfferNotificationSuject';
import NotificationInvalidSubjectException from '../../exceptions/JobOffer/JobOfferNotificationInvalidSubjectException';

export class InterviewNotificationSubject implements IValueObject {
  constructor(private readonly subject: string) {}

  public getSubject() {
    return this.subject;
  }

  public equals(valueObject: InterviewNotificationSubject): boolean {
    return this.subject === valueObject.getSubject();
  }

  public static create(subject: string): InterviewNotificationSubject {
    if (subject == null || subject == undefined) {
      throw new NotificationEmptySubjectException(
        'El motivo no puede estar vacío',
      );
    }

    if (typeof subject != 'string') {
      throw new NotificationInvalidSubjectException(
        'El motivo tiene que ser un string',
      );
    }

    if (!subject.trim()) {
      throw new NotificationEmptySubjectException(
        'El motivo no puede estar vacío',
      );
    }

    return new InterviewNotificationSubject(subject);
  }
}

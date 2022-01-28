import { IValueObject } from '../../../../shared/domain/IValueObject';
import NotificationEmptyContentException from '../../exceptions/JobOffer/JobOfferNotificationEmptyContentException';
import NotificationInvalidSubjectException from '../../exceptions/JobOffer/JobOfferNotificationInvalidSubjectException';

export class InterviewNotificationContent implements IValueObject {
  constructor(private readonly content: string) {}

  public getContent() {
    return this.content;
  }

  public equals(valueObject: InterviewNotificationContent): boolean {
    return this.content === valueObject.getContent();
  }

  public static create(content: string): InterviewNotificationContent {
    if (content == null || content == undefined) {
      throw new NotificationEmptyContentException(
        'El contenido no puede estar vacio',
      );
    }

    if (typeof content != 'string') {
      throw new NotificationInvalidSubjectException(
        'El motivo tiene que ser un string',
      );
    }

    if (!content.trim()) {
      throw new NotificationEmptyContentException(
        'El contenido no puede estar vacio',
      );
    }

    return new InterviewNotificationContent(content);
  }
}

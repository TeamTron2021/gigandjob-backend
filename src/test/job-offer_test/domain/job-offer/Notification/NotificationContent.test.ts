import NotificationEmptyContentException from '../../../../../domain/job-offer/exceptions/JobOffer/JobOfferNotificationEmptyContentException';
import NotificationInvalidContentException from '../../../../../domain/job-offer/exceptions/JobOffer/JobOfferNotificationInvalidaContent';
import { JobOfferNotificationContent } from '../../../../../domain/job-offer/value-objects/JobOffer/JobOfferNotificationContent';

describe('Testing notification content value object', () => {
  test('Should throw an empty notification content error', () => {
    const content: any = null;
    expect(() => JobOfferNotificationContent.create(content)).toThrow(
      new NotificationEmptyContentException(
        'El contenido no puede estar vacio',
      ),
    );
  });

  test('Should throw an empty notification content error', () => {
    const content: any = undefined;
    expect(() => JobOfferNotificationContent.create(content)).toThrow(
      new NotificationEmptyContentException(
        'El contenido no puede estar vacio',
      ),
    );
  });
  test('Should throw an empty notification content error', () => {
    const content: any = '        ';
    expect(() => JobOfferNotificationContent.create(content)).toThrow(
      new NotificationEmptyContentException(
        'El contenido no puede estar vacio',
      ),
    );
  });
  test('Should throw an empty notification content error', () => {
    const content: any = 8;
    expect(() => JobOfferNotificationContent.create(content)).toThrow(
      new NotificationInvalidContentException(
        'El contenido tiene que ser un string',
      ),
    );
  });
  test('Should return an instance of NotificationContent', () => {
    const content = 'Contenido del mensaje';
    const notiContent = JobOfferNotificationContent.create(content);
    const isContent = notiContent instanceof JobOfferNotificationContent;
    expect(isContent).toBe(true);
  });
});

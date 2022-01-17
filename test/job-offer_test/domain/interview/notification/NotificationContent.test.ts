import NotificationEmptyContentException from '../../../../../src/domain/job-offer/exceptions/Interview/Interview/interview-notification/NotificationEmptyContentException';
import NotificationInvalidContentException from '../../../../../src/domain/job-offer/exceptions/Interview/Interview/interview-notification/NotificationInvalidContentException';
import NotificationContent from '../../../../../src/domain/job-offer/value-objects/Interview/interview/interview-notification/NotificationContent';

describe('Testing notification content value object', () => {
  it('Should throw an empty notification content error', () => {
    const content: any = null;
    expect(() => NotificationContent.create(content)).toThrow(
      new NotificationEmptyContentException(
        'El contenido no puede estar vacio',
      ),
    );
  });

  it('Should throw an empty notification content error', () => {
    const content: any = undefined;
    expect(() => NotificationContent.create(content)).toThrow(
      new NotificationEmptyContentException(
        'El contenido no puede estar vacio',
      ),
    );
  });
  it('Should throw an empty notification content error', () => {
    const content: any = '        ';
    expect(() => NotificationContent.create(content)).toThrow(
      new NotificationEmptyContentException(
        'El contenido no puede estar vacio',
      ),
    );
  });
  it('Should throw an empty notification content error', () => {
    const content: any = 8;
    expect(() => NotificationContent.create(content)).toThrow(
      new NotificationInvalidContentException(
        'El contenido tiene que ser un string',
      ),
    );
  });
  it('Should return an instance of NotificationContent', () => {
    const content = 'Contenido generico';
    const notiContent = NotificationContent.create(content);
    const isContent = notiContent instanceof NotificationContent;
    expect(isContent).toBe(true);
  });
});

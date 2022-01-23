import NotificationEmptyContentException from '../../../../src/domain/employeer/exceptions/employeer-notification/NotificationEmptyContentException';
import NotificationInvalidContentException from '../../../../src/domain/employeer/exceptions/employeer-notification/NotificationInvalidContentException';
import NotificationContent from '../../../../src/domain/employeer/value-objects/employeer-notification/NotificationContent';

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

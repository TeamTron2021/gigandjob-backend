import { IValueObject } from '../../../../shared/domain/IValueObject';
import PostulationNotificationEmptyContentException from '../../exceptions/postulation/PostulationNotificationEmptyContentException';
import PostulationNotificationInvalidContentException from '../../exceptions/postulation/PostulationNotificationInvalidContent';

export default class PostulationNotificationContent implements IValueObject {
  constructor(private readonly content: string) {}

  public getContent() {
    return this.content;
  }

  public equals(valueObject: PostulationNotificationContent): boolean {
    return this.content === valueObject.getContent();
  }

  public static create(content: string) {
    if (content == null || content == undefined) {
      throw new PostulationNotificationEmptyContentException(
        'El contenido no puede estar vacio',
      );
    }
    if (typeof content != 'string') {
      throw new PostulationNotificationInvalidContentException(
        'El contenido tiene que ser un string',
      );
    }
    if (!content.trim()) {
      throw new PostulationNotificationEmptyContentException(
        'El contenido no puede estar vacio',
      );
    }

    return new PostulationNotificationContent(content);
  }
}

import { IValueObject } from '../../../../../shared/domain/IValueObject';
import InterviewEmptyDescriptionException from '../../../exceptions/Interview/Interview/InterviewEmptyDescriptionException';

export default class InterviewDescription implements IValueObject {
  constructor(private readonly description: string) {}

  public equals(valueObject: InterviewDescription): boolean {
    return this.description == valueObject.getDescription();
  }

  public static create(description: string) {
    if (
      description === '' ||
      description === ' ' ||
      description == null ||
      description == undefined
    ) {
      throw new InterviewEmptyDescriptionException(
        'La descripcion de la entrevista no puede estar vacio',
      );
    }
    return new InterviewDescription(description);
  }

  public getDescription() {
    return this.description;
  }
}

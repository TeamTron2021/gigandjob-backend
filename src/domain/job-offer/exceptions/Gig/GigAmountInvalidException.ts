import { IException } from '../../../../shared/domain/Iexception';

export default class GigAmountInvalidException
  extends Error
  implements IException
{
  constructor(public readonly message: string) {
    super(message);
  }

  public showError(): string {
    return this.message;
  }
}

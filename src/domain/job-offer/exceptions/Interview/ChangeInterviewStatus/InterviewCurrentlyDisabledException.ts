import { IException } from '../../../../../shared/domain/Iexception';

export default class InterviewCurrentlyDisabledException
  extends Error
  implements IException
{
  constructor(public readonly message: string) {
    super(message);
  }

  showError(): string {
    return this.message;
  }
}

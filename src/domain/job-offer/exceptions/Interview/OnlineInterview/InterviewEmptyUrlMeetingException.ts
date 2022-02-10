import { IException } from '../../../../../shared/domain/Iexception';

export default class InterviewEmptyUrlMeetingException
  extends Error
  implements IException
{
  public constructor(public readonly message: string) {
    super(message);
  }

  public showError(): string {
    return this.message;
  }
}

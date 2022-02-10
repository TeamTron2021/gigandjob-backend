import { IValueObject } from '../../../../../shared/domain/IValueObject';
import InterviewEmptyUrlMeetingException from '../../../exceptions/Interview/OnlineInterview/InterviewEmptyUrlMeetingException';

export default class OnlineInterviewUrlMeeting implements IValueObject {
  constructor(private readonly urlMeeting: string) {}

  public equals(valueObject: OnlineInterviewUrlMeeting): boolean {
    return this.urlMeeting == valueObject.getUrlMeeting();
  }

  public static create(urlMeeting: string) {
    if (
      urlMeeting === '' ||
      urlMeeting === ' ' ||
      urlMeeting == null ||
      urlMeeting == undefined
    ) {
      throw new InterviewEmptyUrlMeetingException(
        'La Url de la Entrevista no puede estar vacia',
      );
    }
    return new OnlineInterviewUrlMeeting(urlMeeting);
  }

  public getUrlMeeting() {
    return this.urlMeeting;
  }
}

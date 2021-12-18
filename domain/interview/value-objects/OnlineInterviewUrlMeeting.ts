import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface OnlineInterviewUrlMeetingProps {
  value: string;
}

export class OnlineInterviewUrlMeeting extends ValueObject<OnlineInterviewUrlMeetingProps> {
  public static minLength: number = 2;
  public static maxLength: number = 85;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: OnlineInterviewUrlMeetingProps) {
    super(props);
  }

  public static create (props: OnlineInterviewUrlMeetingProps): Result<OnlineInterviewUrlMeeting> {

    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'OnlineInterviewUrlMeeting');

    if (!nullGuardResult.succeeded) {
      return Result.fail<OnlineInterviewUrlMeeting>(nullGuardResult.message);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<OnlineInterviewUrlMeeting>(minGuardResult.message);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<OnlineInterviewUrlMeeting>(maxGuardResult.message);
    }

    return Result.ok<OnlineInterviewUrlMeeting>(new OnlineInterviewUrlMeeting(props));
  }
}
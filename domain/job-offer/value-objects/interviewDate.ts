import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface InterviewDateProps {
  value: Date;
}

export class InterviewDate extends ValueObject<InterviewDateProps> {

  get value (): Date {
    return this.props.value;
  }

  private constructor (props: InterviewDateProps) {
    super(props);
  }

  public static create (props: InterviewDateProps): Result<InterviewDate> {

    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'InterviewDate');

    if (!nullGuardResult.succeeded) {
      return Result.fail<InterviewDate>(nullGuardResult.message);
    }

    return Result.ok<InterviewDate>(new InterviewDate(props));
  }
}
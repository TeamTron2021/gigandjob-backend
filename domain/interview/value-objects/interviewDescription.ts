import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface InterviewDescriptionProps {
  value: string;
}

export class InterviewDescription extends ValueObject<InterviewDescriptionProps> {
  public static minLength: number = 2;
  public static maxLength: number = 85;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: InterviewDescriptionProps) {
    super(props);
  }

  public static create (props: InterviewDescriptionProps): Result<InterviewDescription> {

    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'InterviewDescription');

    if (!nullGuardResult.succeeded) {
      return Result.fail<InterviewDescription>(nullGuardResult.message);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<InterviewDescription>(minGuardResult.message);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<InterviewDescription>(maxGuardResult.message);
    }

    return Result.ok<InterviewDescription>(new InterviewDescription(props));
  }
}
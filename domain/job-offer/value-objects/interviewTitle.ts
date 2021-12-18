import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface InterviewTitleProps {
  value: string;
}

export class InterviewTitle extends ValueObject<InterviewTitleProps> {
  public static minLength: number = 2;
  public static maxLength: number = 85;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: InterviewTitleProps) {
    super(props);
  }

  public static create (props: InterviewTitleProps): Result<InterviewTitle> {

    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'InterviewTitle');

    if (!nullGuardResult.succeeded) {
      return Result.fail<InterviewTitle>(nullGuardResult.message);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<InterviewTitle>(minGuardResult.message);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<InterviewTitle>(maxGuardResult.message);
    }

    return Result.ok<InterviewTitle>(new InterviewTitle(props));
  }
}
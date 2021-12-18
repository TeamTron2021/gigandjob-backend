import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface InPersonInterviewDirectionProps {
  value: string;
}

export class InPersonInterviewDirection extends ValueObject<InPersonInterviewDirectionProps> {
  public static minLength: number = 2;
  public static maxLength: number = 85;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: InPersonInterviewDirectionProps) {
    super(props);
  }

  public static create (props: InPersonInterviewDirectionProps): Result<InPersonInterviewDirection> {

    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'InPersonInterviewDirection');

    if (!nullGuardResult.succeeded) {
      return Result.fail<InPersonInterviewDirection>(nullGuardResult.message);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<InPersonInterviewDirection>(minGuardResult.message);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<InPersonInterviewDirection>(maxGuardResult.message);
    }

    return Result.ok<InPersonInterviewDirection>(new InPersonInterviewDirection(props));
  }
}
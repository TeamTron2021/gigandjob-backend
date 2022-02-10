import UpdateInteviewStatus from "../ports/updateInterviewStatus.dto";

export class ReactiveUserInterviewCommand {
    constructor(public readonly interviewStatus: UpdateInteviewStatus) {}
}
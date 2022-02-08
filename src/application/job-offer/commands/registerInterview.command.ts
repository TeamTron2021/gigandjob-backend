import InterviewDto from '../ports/interview.dto';

export class RegisterInterviewCommand {
  constructor(public readonly interview: InterviewDto) {}
}

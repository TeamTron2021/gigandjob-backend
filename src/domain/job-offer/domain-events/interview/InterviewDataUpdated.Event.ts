import InterviewDescription from '../../value-objects/Interview/interview/InterviewDescription';
import InterviewTitle from '../../value-objects/Interview/interview/InterviewTitle';

export class InterviewDataUpdated {
  constructor(
    public Description: InterviewDescription,
    public Title: InterviewTitle,
  ) {}
}

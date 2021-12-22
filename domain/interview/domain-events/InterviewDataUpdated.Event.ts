import InterviewDescription from "../value-objects/interview/InterviewDescription";
import InterviewTitle from "../value-objects/interview/InterviewTitle";

export class InterviewDataUpdated{
	constructor(
		public Description: InterviewDescription,
		public Title: InterviewTitle,
	){}
}
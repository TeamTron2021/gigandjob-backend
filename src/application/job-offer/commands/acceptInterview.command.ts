import AcceptInterviewDto from "../ports/acceptInterview.dto";

export default class AcceptInterviewCommand {
	constructor(
		public readonly interview: AcceptInterviewDto
	) {}
}

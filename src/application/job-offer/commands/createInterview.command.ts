import CreateInterviewDto from '../ports/createInterview.dto';
import JobOfferFound from '../ports/jobOfferFound.dto';

export class CreateInterviewCommand {
  constructor(
    public readonly interview: CreateInterviewDto,
    public readonly jobOffer: JobOfferFound,
  ) {}
}

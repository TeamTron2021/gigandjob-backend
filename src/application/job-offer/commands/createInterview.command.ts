import CreateInterviewDto from '../ports/createInterview.dto';
import PostulationFound from '../ports/findPostulationResult.dto';

export class CreateInterviewCommand {
  constructor(
    public readonly interview: CreateInterviewDto,
    public readonly postulation: PostulationFound,
  ) {}
}

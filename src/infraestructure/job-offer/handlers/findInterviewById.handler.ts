import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import InterviewFound from "../../../application/job-offer/ports/interviewFound.dto";
import FindInterviewById from "../../../application/job-offer/queries/findInterviewById.query";
import {InterviewRepository} from "../repositories/InterviewRepository.repository";

@QueryHandler(FindInterviewById)
export class findInterviewByIdHandler
  implements IQueryHandler<FindInterviewById, InterviewFound>
{
  constructor(private readonly interviewRepository: InterviewRepository) {}

  async execute(query: FindInterviewById): Promise<InterviewFound> {
    return await this.interviewRepository.findById(query.id);
  }
}
